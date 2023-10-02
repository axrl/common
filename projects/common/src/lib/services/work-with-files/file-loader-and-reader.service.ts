import {Injectable} from '@angular/core';

/**Форматирует размер файла из байтов в мегабайты */
export function returnFileSize(size: number): number {
    return +(size / 1048576).toFixed(1);
}

@Injectable({
    providedIn: 'root',
})
export class FileLoaderAndReaderService {
    returnFileSize = returnFileSize;

    constructor() {}

    async onlyLoadFile(accept: string): Promise<File> {
        return new Promise(resolve => {
            let fileInput: HTMLInputElement | null = document.createElement('input');
            [fileInput!.type, fileInput!.accept, fileInput!.multiple] = ['file', accept, false];
            const listener = (event: Event): void => {
                fileInput!.removeEventListener('change', listener);
                fileInput = null;
                const result = (<HTMLInputElement>event?.target)?.files?.[0];
                if (result) {
                    resolve(result);
                }
            };
            fileInput.addEventListener('change', listener);
            fileInput.click();
        });
    }

    async readFileAsBase64(accept: string): Promise<{name: string; data: string}> {
        const file = await this.onlyLoadFile(accept);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = (e): void =>
                resolve({name: file.name, data: btoa(e!.target!.result as string)});
            reader.onerror = (e): void => reject(e);
            reader.readAsBinaryString(file);
        });
    }

    async readFileAsDataUrl(accept: string): Promise<{name: string; dataUrl: string}> {
        const file = await this.onlyLoadFile(accept);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = (e): void =>
                resolve({name: file.name, dataUrl: e!.target!.result as string});
            reader.onerror = (e): void => reject(e);
            reader.readAsDataURL(file);
        });
    }
}
