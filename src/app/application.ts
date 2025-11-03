import express from 'express';
import multer from 'multer';

import type { Express, Request, Response, } from 'express';
import type { Multer, StorageEngine } from 'multer';

import { generateFromMultipleImage } from '../api/v1/generate-from-multiple.ts';
import { generateFromSingleImage } from '../api/v1/generate-from-single.ts';
import { CrossDatabase } from '../models/database.ts';
import { getImageStorage } from '../models/images.ts';
import { handleMiddlewareErrors } from '../types/errors.ts';
import { checkPort } from '../types/types.ts';

export class Application {
  private readonly app: Express;
  private readonly db: CrossDatabase;
  private readonly imageStorage: StorageEngine;
  private readonly port: number;
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
      paths: [
        '/api/v1/generate-from-single', 
        '/api/v1/generate-from-multiple',
        '/api/v1/register-new-user'
      ]
    });
  }

  public constructor() {
    this.app = express();
    this.db = new CrossDatabase();
    this.imageStorage = getImageStorage();
    // FIXME: `process.env.PORT` should be replaced with typesafe feature.
    this.port = checkPort(Number.parseInt(process.env.PORT!));
    this.upload = multer({ storage: this.imageStorage });

    this.db.checkTables()
  }

  public startListening(): void {
    // Root route with GET-request:
    this.app.get('/', this.handleRoot);
    // Methods with POST-request:
    this.app.post(
      '/api/v1/generate-from-single', 
      this.upload.single('image'), 
      (request: Request, response: Response) => {
        generateFromSingleImage(request, response, this.db);
      }
    );
    this.app.post(
      '/api/v1/generate-from-multiple', 
      this.upload.array('images', 5), 
      (request: Request, response: Response) => {
        generateFromMultipleImage(request, response, this.db);
      }
    );

    // TODO: Make readable comments here later.
    this.app.use(handleMiddlewareErrors);
    this.app.listen(this.port, () => console.log(`Server started on ${this.getServerUri()}.`));
  }
}
