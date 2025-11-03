import { InvalidPortError } from './errors.ts';

export const allowedFileExtensions = ['jpeg', 'jpg', 'png'];

/**
 * Equivalent of 50 megabytes in bytes.
 */
export const maxUploadingFileSize = 52_428_800;

export const Code = {
  OK: 200,
  BadRequest: 500
} as const;

export type ResponseCode = typeof Code[keyof typeof Code];

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

export function stringify(value: any): string {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return `${value}`;
}  
