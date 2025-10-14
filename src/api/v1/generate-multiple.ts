import type { Request, Response } from 'express';

import { Code } from '../../types.ts';

export function handleMultipleImagesGeneration(request: Request, response: Response): any {
  if (!request.files || (request.files as Express.Multer.File[]).length === 0) {
    return response.status(Code.BadRequest)
      .json({ message: 'No files uploaded' });
  }

  const _filenames = (request.files as Express.Multer.File[]).map(file => file.filename);
  response.json({ message: 'Images uploaded successfully' });
} 
