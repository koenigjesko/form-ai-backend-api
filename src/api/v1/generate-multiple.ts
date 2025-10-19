import type { Request, Response } from 'express';

import { Code } from '../../types/types.ts';

export function handleMultipleImagesGeneration(request: Request, response: Response): any {
  if (!request.files || (request.files as Express.Multer.File[]).length === 0) {
    return response.status(Code.BadRequest)
      .json({ message: 'No files uploaded' });
  }

  const files = (request.files as Express.Multer.File[]);

  for (const file of files) {
    if (file.size > 52_428_800) {
      return response.status(Code.BadRequest)
        .json({ message: 'The size of the uploaded file must not exceed 50 megabytes.' });
    }
  }

  response.json({ message: 'Images uploaded successfully' });
} 
