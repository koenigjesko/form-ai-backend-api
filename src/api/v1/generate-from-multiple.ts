import type { Request, Response } from 'express';

import { CrossDatabase } from '../../models/database.ts';
import { Code, maxUploadingFileSize } from '../../types/types.ts';

export function generateFromMultipleImage(
  request: Request, 
  response: Response,
  _db: CrossDatabase
): any {
  const userIdParam = request.query['user_id'] as string;
  const files = (request.files as Express.Multer.File[]);
  
  // FIXME: REMOVE INTO IMAGES STORAGE GENERATOR.
  if (!userIdParam) {
    return response.json({ 
      message: 'To generate an image, you must pass a unique user ID as the user-id request parameter.'
    });
  }
  if (!request.files || files.length === 0) {
    return response.status(Code.BadRequest)
      .json({ message: 'No files uploaded' });
  }

  for (const file of files) {
    if (file.size > maxUploadingFileSize) {
      return response.status(Code.BadRequest)
        .json({ message: 'The size of the uploaded file must not exceed 50 megabytes.' });
    }
  }

  try {
    // Generation here.

    const _userId = Number.parseInt(userIdParam);
    // db.insertGeneration({ user_id: userId, uploaded_image_path: join(cwd(), request.file.path) })
    // Somehow files names must be added to array...

    response.status(Code.OK)
      .json({ message: 'Image uploaded successfully.' });
  } catch {
      return response.json({ message: 'user_id parameter must be a numeric value.' });
  }
}
