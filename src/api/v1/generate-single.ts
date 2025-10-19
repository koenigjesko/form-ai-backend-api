import type { Request, Response } from 'express';

import { Code } from '../../types/types.ts';

export function handleSingleImageGeneration(request: Request, response: Response): any {
  if (!request.file) {
    return response.status(Code.BadRequest)
      .json({ message: 'No file uploaded.' });
  }

  if (request.file.size > 52_428_800) {
    return response.status(Code.BadRequest)
      .json({ message: 'The size of the uploaded file must not exceed 50 megabytes.' });
  }

  response.json({ message: 'Image uploaded successfully' });
}
