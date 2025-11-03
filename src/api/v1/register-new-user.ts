import type { Request, Response } from 'express';

export function registerNewUser(_request: Request, response: Response): any {
  response.json({ message: 'In progress...' });
}
