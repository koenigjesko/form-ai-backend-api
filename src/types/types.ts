import { InvalidPortError } from './errors.ts';

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

export const Code = {
  OK: 200,
  BadRequest: 500
} as const;

export type ResponseCode = typeof Code[keyof typeof Code];

/**
 * @deprecated
 * I sht in the mouth of those who decided that enums are unsafe...
 */
export const RequestMethod = {
  GET: 1,
  POST: 2,
  PUT: 3,
  PATCH: 4,
  DELETE: 5,
  HEAD: 6,
  OPTIONS: 7
} as const;

/**
 * @deprecated
 */
export type Method = typeof RequestMethod[keyof typeof RequestMethod];

export const allowedFileExtensions = ['jpeg', 'jpg', 'png'];
