import { config } from 'dotenv';

import { Application } from './app/application.ts';
import { GenerationsDatabase } from './models/database.ts';

function main(): void {
  config({ quiet: true });

  const db = new GenerationsDatabase();

  // FIXME: `process.env.PORT` should be replaced with typesafe feature.
  const server = new Application(3000); 
  server.startListening();
}

main();
