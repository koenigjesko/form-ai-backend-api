import type { Request, Response } from 'express';

import { ApiDatabase } from '../../models/database.ts';
import { Code, joinWithCwd, maxUploadingFileSize } from '../../types/types.ts';

export function generateFromSingleImage(
  request: Request, 
  response: Response, 
  db: ApiDatabase
): any {
  response.status(Code.BadRequest);

  const userIdParam = request.query['user_id'] as string;

  // FIXME: REMOVE INTO IMAGES STORAGE GENERATOR.
  if (!userIdParam) {
    return response.json({
      message: 'To generate an image, you must pass a unique user ID as the user-id request parameter.'
    });
  }
  if (!request.file) {
    return response.json({ message: 'No file uploaded.' });
  }
  if (request.file.size > maxUploadingFileSize) {
    return response.json({ message: 'The size of the uploaded file must not exceed 50 megabytes.' });
  }

  try {
    // Generation here.

    const userId = Number.parseInt(userIdParam);
    
    db.insertGeneration({ 
      user_id: userId, 
      uploaded_images_paths: [joinWithCwd(request.file.path)] 
    });

    response.status(Code.OK)
      .json({ message: 'Image uploaded successfully.' });
  } catch {
    return response.json({ message: 'user_id parameter must be a numeric value.' });
  }
}
