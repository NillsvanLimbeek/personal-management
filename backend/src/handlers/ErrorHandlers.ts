import { Request, Response, NextFunction } from 'express';

/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

export function catchErrors(fn: Function) {
    return function(req: Request, res: Response, next: NextFunction) {
        return fn(req, res, next).catch(next);
    };
}
