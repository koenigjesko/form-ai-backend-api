import { config } from 'dotenv';

import { Application } from './app/application.ts';

function main(): void {
  config({ quiet: true });

  const server = new Application(); 
  server.startListening();
}

main();
