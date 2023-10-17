import {isValue} from '../is-value';

export function generateUUIDFn(win: (Window & typeof globalThis) | null): string {
    if (isValue(win) && isValue(win.crypto) && isValue(win.crypto.randomUUID)) {
        return win.crypto.randomUUID();
    } else {
        return `${Date.now()}${String(Math.random()).slice(3)}`;
    }
}
