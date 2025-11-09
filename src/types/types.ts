import { InvalidPortError } from './errors.ts';

import { join } from 'path';
import { cwd } from 'process';

export const allowedFileExtensions = ['jpeg', 'jpg', 'png'];

/**
 * Equivalent of 50 megabytes in bytes.
 */
export const maxUploadingFileSize = 52_428_800;

export const apiPaths = [
  '/api/v1/generate-from-single', 
  '/api/v1/generate-from-multiple',
  '/api/v1/register-new-user',
  '/api/v1/authorize-user'
];

export const Code = {
  OK: 200,
  BadRequest: 500
} as const;

export type ResponseCode = typeof Code[keyof typeof Code];

export interface Dictionary {
  [key: string]: any;
}

/**
 * May be this is sh*t? :)))
 * @param filepath Path of file.
 * @returns `string` joined file path with `cwd()`.
 */
export const joinWithCwd = (...parts: string[]) => join(cwd(), ...parts);

export function checkPort(value: number): number | never {
  if (value.toString().length != 4) {
    throw new InvalidPortError('Server port value must be in range between 1000 and 9999.');
  }

  return value;
}

export function checkFileExtension(filename: string): boolean {
  const parts = filename.split('.');
  const fileExtension = parts[parts.length - 1];

  return fileExtension !== undefined ? allowedFileExtensions.includes(fileExtension) : false;
}

export function stringifyWithRules(value: any): string {
  if (value instanceof Array) {
    value = JSON.stringify(value);
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return `${value}`;
}

/**
 * If one of the parameters is missing, it is necessary to 
 * return a corresponding message about this.
 * @param object -
 * @param propertyNames -
 * @returns -
 */
export function getTypedParamsOf<T extends Dictionary>(
  object: any, ...propertyNames: string[]
): T {
  let properties: Dictionary = {};

  for (const propertyName of propertyNames) {
    const property = object[propertyName];

    if (property) {
      properties[propertyName] = property;
    }
    // FIXME: If `unedfined` - must be thrown error or something else...
  }

  return properties as T;
}
