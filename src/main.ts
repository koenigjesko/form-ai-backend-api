import { Application } from './application.ts';

const server = new Application(3000);
server.startListening();
