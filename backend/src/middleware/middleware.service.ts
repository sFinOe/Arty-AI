import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UseragentService } from '../useragent/useragent.service';
import * as net from 'net';

@Injectable()
export class MiddlewareService implements NestMiddleware {
  constructor(private readonly useragentService: UseragentService) {}
  async use(req: Request, res: Response, next: Function) {
    const useragent = req.headers['user-agent'];
    let deviceType;
    if (/mobile/i.test(useragent)) {
      deviceType = 'Mobile';
    } else if (/tablet/i.test(useragent)) {
      deviceType = 'Tablet';
    } else {
      deviceType = 'Desktop';
    }
    const ipv4: string = Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const agent = await this.useragentService.findOne({
      ipAddress: ipv4,
    });

    if (!agent) {
      const newagent = await this.useragentService.create({
        ipAddress: ipv4,
        device: deviceType,
        useragent: useragent,
      });
      console.log(newagent);
    }

    next();
  }
}
