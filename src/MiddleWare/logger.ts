import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const chunks: Buffer[] = [];

    res.on('end', function(chunk) {
        if (chunk) {
            chunks.push(Buffer.from(chunk));
        }
        var body = Buffer.concat(chunks).toString('utf8');
        console.log(req.path, body);
    });

    res.on('close', () => {
        const requestBody = req.body;
        const qs = req.query;
        const url = req.url;
        const headers = req.headers;
        
        console.log({
            requestBody,
            qs,
            url,
            headers
        });

        const body = Buffer.concat(chunks).toString('utf8');
        console.log({
            response: body,
        });
      });
    next();
  }
}
