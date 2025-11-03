import { diskStorage, type StorageEngine } from 'multer';

import type { Request } from 'express';

/**
 * Somehow auth and others checks should be added here...
 * 
 * @returns `StorageEngine` - a special object for storing images.
 */
export function getImageStorage(): StorageEngine {
  return diskStorage({
    destination: (
      _request: Request, 
      _file: Express.Multer.File, 
      callback: (error: Error | null, destination: string) => void
    ) => {
      callback(null, 'public/uploaded_images/');
    },

    filename: (
      request: Request, 
      file: Express.Multer.File, 
      callback: (error: Error | null, filename: string) => void
    ) => {
      const userId = request.query['user_id']; // FIXME: Add error throwing and checks for id.
      // Later, the username needs to be embedded in the file 
      // name to easily associate the file with the user.
      callback(
        null, 
        Date.now() + '-' + userId +  '-' + file.originalname 
      );
    }
  });
}
