"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_angular_1 = require("@angular-devkit/build-angular");
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require("rxjs");
const child_process_1 = require("child_process");
const util_1 = require("util");
const listr_1 = require("listr");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
async function runCommands(array_command, mode) {
    if (array_command !== undefined) {
        try {
            const list = new listr_1.default(array_command.map((command, i) => {
                return {
                    title: `Execute command ${i}: ${command}`,
                    task: async () => {
                        try {
                            const result = await execPromise(command, {
                                encoding: 'utf-8'
                            });
                            if (result.stderr) {
                                console.log(`stderr - ${result.stderr}`);
                            }
                            ;
                        }
                        catch (error) {
                            console.log(error);
                        }
                        ;
                    }
                };
            }));
            await list.run();
            return {
                success: true,
                stdout: `All ${mode === 'before' ? 'before build command' : 'after build command'}-tasks complete!`
            };
        }
        catch (error) {
            return {
                success: false,
                error: typeof error == 'string' ?
                    error :
                    JSON.stringify(error)
            };
        }
        ;
    }
    else {
        return {
            success: true,
            stdout: `Not found ${mode === 'before' ? 'before build command' : 'after build command'}-tasks.`
        };
    }
    ;
}
;
function executeBuilder(input, context, transforms) {
    return (0, rxjs_1.from)(runCommands(input.beforeBuildCommands, 'before')).pipe((0, rxjs_1.switchMap)(
    /**@ts-ignore */
    () => {
        return (0, build_angular_1.executeBrowserBuilder)(input, context, transforms);
    }), (0, rxjs_1.switchMap)(output => (0, rxjs_1.from)(runCommands(input.afterBuildCommands, 'after')).pipe((0, rxjs_1.map)(resCommands => output))));
}
exports.default = (0, architect_1.createBuilder)(executeBuilder);
//# sourceMappingURL=index.js.map