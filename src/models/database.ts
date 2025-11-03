import Database, { type Database as DatabaseType } from 'better-sqlite3';

import { stringify } from '../types/types.ts';

import { readFileSync } from 'fs';

type RowType = User | Generation;
type Table = 'users' | 'generations';

export interface User {
  readonly user_id: number;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly profile_image_path: never; // FIXME: REMOVE WITH ACTUAL TYPE LATER.
}

export interface Generation {
  readonly operation_id: number;
  readonly user_id: number;
  readonly uploaded_image_path: string;
  readonly generated_image_path: never; // FIXME: REMOVE WITH ACTUAL TYPE LATER.
}

export class CrossDatabase {
  private readonly db: DatabaseType;

  /**
   * The `data` parameter type - `Omit<T, keyof T>` should be more specific...
   * @param data - 
   * @param table -
   * @returns -
   */
  private selectRow<T extends RowType>(data: Omit<T, keyof T>, table: Table): T {
    let paramsQuery = [];

    for (const property of Object.getOwnPropertyNames(data)) {
      // @ts-ignore FIXME: Should be fixed later with typesafe variant. 
      const dataProperty = data[property];
      const value = stringify(dataProperty);

      paramsQuery.push(`${property} = ${value}`);
    }

    const result = this.db.prepare(`SELECT * FROM ${table} WHERE ${paramsQuery.join(' AND ')}`);
    return result.get() as T;
  }
  
  /**
   * The `data` parameter type - `Omit<T, keyof T>` should be more specific...
   * @param data -
   * @param table -
   */
  private insertRow<T extends RowType>(data: Omit<T, keyof T>, table: Table): void {
    const fields = [];
    const values = [];

    for (const property of Object.getOwnPropertyNames(data)) {
      // @ts-ignore FIXME: Should be fixed later with typesafe variant. 
      const dataProperty = data[property];
      const value = stringify(dataProperty);
      
      fields.push(property);
      values.push(value);
    }

    const statement = this.db.prepare(
      `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${values.join(', ')})`
    );
    statement.run();
  }

  public constructor() {
    // FIXME: `process.env.DATABASE_FILE` should be replaced with typesafe feature.
    this.db = new Database(process.env.DATABASE_FILE!); 
    this.db.pragma('journal_mode = WAL');
  }

  public checkTables(): void {
    // FIXME: `process.env.DATABASE_SCHEMA` should be replaced with typesafe feature.
    const initDBQuery = readFileSync(process.env.DATABASE_SCHEMA!, 'utf-8'); 
    this.db.exec(initDBQuery);
  }

  public selectUser(user: Omit<User, keyof User>): User {
    return this.selectRow<User>(user, 'users');
  }

  // Not used.
  public selectGeneration(generation: Omit<Generation, keyof Generation>): Generation {
    return this.selectRow<Generation>(generation, 'generations');
  }

  public insertUser(user: Omit<User, 'user_id' | 'profile_image_path'>): void {
    this.insertRow<User>(user, 'users');
  }

  public insertGeneration(
    generation: Omit<Generation, 'operation_id' | 'generated_image_path'>
  ): void {
    this.insertRow<Generation>(generation, 'generations');
  }
}
