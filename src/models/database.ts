import Database from 'better-sqlite3';

import { readFileSync } from 'fs';

interface User {
  id?: number;
  name: string;
  surname: string;
  profileImage?: string;
}

interface GenerationProcess {
  authorId: number;
  uploadedImage: Express.Multer.File;
  // generatedImage: ???; // TODO: Specify types and other later.
}

export class GenerationsDatabase {
  // @ts-ignore
  private db: Database; 

  public constructor() {
    // FIXME: `process.env.DATABASE_FILE` should be replaced with typesafe feature.
    this.db = new Database(process.env.DATABASE_FILE!); 

    this.db.pragma('journal_mode = WAL');

    // FIXME: `process.env.DATABASE_SCHEMA` should be replaced with typesafe feature.
    const initDBQuery = readFileSync(process.env.DATABASE_SCHEMA!, 'utf-8'); 
    this.db.exec(initDBQuery)
  }
}
