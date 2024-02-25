import { Response } from 'express';

export class ReturnResponse {
  error: boolean;
  statusCode: number;
  message: string;
  response: any;

  constructor(
    res: Response,
    statusCode: number,
    message: string,
    response: any,
  ) {
    this.error = false;
    this.statusCode = statusCode;
    this.message = message;
    this.response = response;

    res.status(this.statusCode).send(this);
  }
}
