import type { Request, Response } from 'express';

import { ApiDatabase } from '../../models/database.ts';
import { Code, getTypedParamsOf } from '../../types/types.ts';

import type { User } from '../../models/database.ts';

export function authorizeUser(request: Request, response: Response, db: ApiDatabase): any {
  response.status(Code.BadRequest);
  const userData = getTypedParamsOf<User>(request.query, 'email', 'password');

  if (db.isUserExists(userData, 'OR')) {
    const dbOption = db.selectUser(userData, 'OR');

    const dataIsCorrect = 
      dbOption.email === userData.email 
      && 
      dbOption.password === userData.password;
    
    if (dataIsCorrect) {
      response.status(Code.OK)
        .json({ message: 'User successfully authorized. All data is correct.' });
    } else {
      response.json({ message: 'Authorization failed. Email or password is incorrect.' });
    }

    return;
  }

  // This may be joined with previous message.
  response.json({ message: 'User with provided data is not exists.' }); 
}
