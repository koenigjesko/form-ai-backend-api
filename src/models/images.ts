import { diskStorage, type StorageEngine } from 'multer';

import type { Request } from 'express';

export function getImageStorage(): StorageEngine {
  return diskStorage({
    destination: (
      _request: Request, 
      _file: Express.Multer.File, 
      callback: (error: Error | null, destination: string) => void
    ) => {
      callback(null, 'public/images/');
    },

    filename: (
      _request: Request, 
      file: Express.Multer.File, 
      callback: (error: Error | null, filename: string) => void
    ) => {
      // Later, the username needs to be embedded in the file 
      // name to easily associate the file with the user.
      callback(
        null, 
        Date.now() + '-username-' + file.originalname 
      );
    }
  });
}
