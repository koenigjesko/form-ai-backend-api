import type { Request, Response } from 'express';

import { Code } from '../../types.ts';

export function handleSingleImageGeneration(request: Request, response: Response): any {
  if (!request.file) {
    return response.status(Code.BadRequest)
      .json({ message: 'No file uploaded.' });
  }

  response.json({ message: 'Image uploaded successfully' });
} 
