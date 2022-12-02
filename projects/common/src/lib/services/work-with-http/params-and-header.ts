import { formatDate } from "@angular/common";
import { isValue } from "../../is-value";

export type AdditionalActionCallbackFn<T> = (result?: T) => void;

export type ParamsAndHeaders = {
  headers?: { [ header: string ]: string; },
  params?: { [ params: string ]: any; };
};

export function makeHttpParams(
  value: {
    [param: string]: string | any;
  },
  params: {
    [param: string]: string | string[];
  },
  firstKey?: string
) {
  if (isValue(value)) {
    const createKeyName = (key: string, keyDot: string | undefined): string => keyDot ? `${keyDot}.${key}` : key;
    Object.keys(value).forEach(key => {
      switch (true) {
        case value[key] instanceof Date: params[createKeyName(key, firstKey)] = formatDate(value[key], key.includes('To') ? 'yyyy-MM-ddT23:59:59' : 'yyyy-MM-ddT00:00:00', 'en'); break;
        case typeof value[key] == 'string': params[createKeyName(key, firstKey)] = value[key]; break;
        case ["number", "bigint", "boolean"].includes(typeof value[key]): params[createKeyName(key, firstKey)] = String(value[key]); break;
        case value[key] instanceof Array: params[createKeyName(key, firstKey)] = (<any[]>value[key]).slice(); break;
        case typeof value[key] == 'object': makeHttpParams(value[key], params, createKeyName(key, firstKey)); break;
        case typeof value[key] == 'function': break;
      };
    });
  };
  return params;
}