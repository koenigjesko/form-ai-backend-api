import Database, { type Database as DatabaseType } from 'better-sqlite3';
import { config } from 'dotenv';

import { trace } from './testhub.ts';

import { readFileSync } from 'fs';

const admin = {
  name: 'admin',
  surname: 'server',
  email: 'admin@server.org'
};
const moderator = {
  name: 'moderator',
  surname: 'site',
  email: 'moderator@site.org'
};

/**
 * @deprecated
 * 
 * FORCES WRITING TO DATABASE! IT IS STRICTLY **UNSAFE AND MAY BE USED FOR INJECTIONS**!!!
 */
function forceUsersDataWriting(db: DatabaseType): void {
  const adminUserAdditionQuery = db.prepare(`INSERT INTO users (name, surname, email) VALUES (?, ?, ?)`);
  adminUserAdditionQuery.run('admin', 'server', 'admin@server.org');

  const moderatorUserAdditionQuery = db.prepare(`INSERT INTO users (name, surname, email) VALUES (?, ?, ?)`);
  moderatorUserAdditionQuery.run('moderator', 'site', 'modertaor@site.org');
}

export function runTest(): void {
  config({ quiet: true });

  const db = new Database(process.env.DATABASE_FILE!); 
  db.pragma('journal_mode = WAL');

  // FIXME: `process.env.DATABASE_SCHEMA` should be replaced with typesafe feature.
  const initDBQuery = readFileSync(process.env.DATABASE_SCHEMA!, 'utf-8'); 
  db.exec(initDBQuery);

  // forceUsersDataWriting(db);

  const adminUserLines = db.prepare(`SELECT COUNT(*) AS count FROM users WHERE name = ? AND surname = ? AND email = ?`);
  const adminUserLinesCount = adminUserLines.run(admin.name, admin.surname, admin.email);

  console.log((adminUserLinesCount as any).count);

  for (const propertyName of Object.getOwnPropertyNames(adminUserLines)) {
    trace('database-filler', 50, `${propertyName}:`, (adminUserLines as any)[propertyName]);

    if (propertyName == 'database') {
      trace('database-filler', 53, Object.getOwnPropertyNames(adminUserLines[propertyName]));
    }
  }

  for (const propertyName of Object.getOwnPropertyNames(adminUserLinesCount)) {
    trace('database-filler', 58, `${propertyName}:`, (adminUserLinesCount as any)[propertyName]);
  }

  forceUsersDataWriting(db);
}
