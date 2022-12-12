import { Injectable } from '@angular/core';
import { utils, read, writeFile } from 'xlsx';
import type { WorkBook } from 'xlsx';
import { map, Observable } from 'rxjs';
import { TranslationsService } from '../translations.service';
import { isValue } from '../../is-value';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private translationService: TranslationsService) { }

  create<T>(data: T[], filename: string, keys: { [key: string]: string; }) {
    const ws = utils.json_to_sheet<T>(data);
    ws['!margins'] = {
      bottom: 0.75,
      footer: 0.3,
      header: 0.3,
      left: 0.7,
      right: 0.7,
      top: 0.75
    };
    ws['!cols'] = Object.keys(keys).map(
      (key, index) => {
        const link = String.fromCharCode(65 + index) + '1';
        const wsName: string = ws[link].v;
        const headerKey = keys[wsName];
        const thElement = document.getElementById(`th-${headerKey}`);
        return { wpx: thElement ? thElement.clientWidth : 150 };
      }
    );
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Таблица 1');
    writeFile(wb, `${filename}.xlsx`);
  }

  translateAndCreate<T extends {}>(data: T[], filename: string) {
    return this.translationService.translations$.pipe(
      map(
        translations => {
          const keys: { [key: string]: string; } = {};
          this.create(
            data.map(
              item => (<(keyof T)[]>Object.keys(item)).reduce(
                (acc: Record<string, string>, key: keyof T) => {
                  if (key !== 'interfaceType' && !(item[key] instanceof Observable)) {
                    const newKey = this.translationService.translate(translations, String(key));
                    keys[newKey] = String(key);
                    acc[newKey] = isValue(item[key]) && typeof item[key] === 'object' ?
                      JSON.stringify(item[key]) :
                      isValue(item[key]) && item[key] !== '' ?
                        this.translationService.translate(translations, String(item[key])) :
                        String(item[key]) ?? '';
                  }
                  return acc;
                }, {}
              )
            ), filename, keys
          );
        }
      )
    )

  }

  /**
   *
   * @param file Base64 строка, представляющая прочитанный файл .csv
   * @returns Массив элементов, прочитанный из таблицы.
   */
  base64FromSheetFileToArrayJson<T>(file: string, header?: "A" | number | string[]): T[] {
    const vb = read(file, { type: 'base64' });
    const sheat = vb.Sheets[vb.SheetNames[0]];
    return utils.sheet_to_json<T>(sheat, header ? {
      header
    } : undefined);
  }

}