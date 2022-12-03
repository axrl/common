

import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import type { ExecutionTransformer, BrowserBuilderOptions } from '@angular-devkit/build-angular';
import type { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';
import type { WebpackLoggingCallback } from '@angular-devkit/build-webpack';
import { createBuilder } from '@angular-devkit/architect';
import type { BuilderContext } from '@angular-devkit/architect';
import type { Configuration } from 'webpack';
import { from, map, switchMap } from 'rxjs';
import { exec } from 'child_process';
import { promisify } from 'util';
import Listr from 'listr';

export interface ExtendedBrowserBuilderOptions extends BrowserBuilderOptions {

  /** массив комманд, которые требуется выполнить перед запуском оригинального builder-a Angular */
  beforeBuildCommands: string[];

  /** массив комманд, которые требуется выполнить после того, как оригинальный builder Angular завершит сборку проекта.*/
  afterBuildCommands: string[];
}

const execPromise = promisify(exec);

async function runCommands(array_command: string[] | undefined, mode: 'before' | 'after') {

  if (array_command !== undefined) {

    try {
      const list = new Listr(array_command.map(
        (command, i) => {

          return <Listr.ListrTask>{
            title: `Execute command ${i}: ${command}`,
            task: async () => {
              try {
                const result = await execPromise(command, {
                  encoding: 'utf-8'
                });
                if (result.stderr) {
                  console.log(`stderr - ${result.stderr}`);
                };
              } catch (error) {
                console.log(error);
              };
            }
          }

        }
      ));
      await list.run();

      return {
        success: true,
        stdout: `All addition ${mode === 'before' ? 'before build command' : 'after build command'}-tasks complete!`
      };

    } catch (error: unknown) {

      return {
        success: false,
        error: typeof error == 'string' ?
          error :
          JSON.stringify(error)
      };

    };

  } else {

    return {
      success: true,
      stdout: `Not found addition ${mode === 'before' ? 'before build command' : 'after build command'}-tasks.`
    };

  };

};

function executeBuilder(
  input: ExtendedBrowserBuilderOptions,
  context: BuilderContext,
  transforms?: {
    webpackConfiguration?: ExecutionTransformer<Configuration>;
    logging?: WebpackLoggingCallback;
    indexHtml?: IndexHtmlTransform;
  }
) {
  return from(
    runCommands(input.beforeBuildCommands, 'before')
  ).pipe(
    switchMap(
      /**@ts-ignore */
      () => {
        return executeBrowserBuilder(input, context, transforms);
      }),
    switchMap(
      output => from(
        runCommands(input.afterBuildCommands, 'after')
      ).pipe(
        map(
          resCommands => output
        )
      )
    )
  )
}

export default createBuilder<ExtendedBrowserBuilderOptions>(executeBuilder);