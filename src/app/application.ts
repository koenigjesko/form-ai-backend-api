import express from 'express';
import multer from 'multer';

import type { Express, Request, Response, } from 'express';
import type { Multer, StorageEngine } from 'multer';

import { handleMultipleImagesGeneration, handleSingleImageGeneration } from '../api/v1/export.ts';
import { getImageStorage } from '../models/images.ts';
import { handleMiddlewareErrors } from '../types/errors.ts';
import { checkPort } from '../types/types.ts';

export class Application {
  private readonly port: number;
  private readonly app: Express;
  private readonly imageStorage: StorageEngine;
  private readonly upload: Multer;

  /**
   * @deprecated
   * 
   * Made only for debug builds when api is runnig at localhost.
   */
  private getServerUri(): string {
    return `http://localhost:${this.port}/`;
  }

  private handleRoot(_request: Request, response: Response): void {
    response.json({ 
      message: 'Use POST-method on next api paths.',
      paths: ['/api/v1/generate-single', '/api/v1/generate-multiple']
    });
  }

  public constructor(port: number) {
    this.port = checkPort(port);
    this.app = express();
    this.imageStorage = getImageStorage();
    this.upload = multer({ storage: this.imageStorage })
  }

  public startListening(): void {
    // Root route with GET-request:
    this.app.get('/', this.handleRoot);
    // Methods with POST-request:
    this.app.post('/api/v1/generate-single', this.upload.single('image'), handleSingleImageGeneration);
    this.app.post('/api/v1/generate-multiple', this.upload.array('images', 5), handleMultipleImagesGeneration);

    // TODO: Make readable comments here later.
    this.app.use(handleMiddlewareErrors);
    this.app.listen(this.port, () => console.log(`Server started on ${this.getServerUri()}.`));
  }
}
