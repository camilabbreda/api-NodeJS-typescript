import { AxiosError } from 'axios';
import { Response } from 'express';
import { AppException } from '../error/app-exception';

export class ReturnError {
  error: boolean;
  message: string;
  errorCode?: number;

  constructor(res: Response, error: AxiosError) {
    this.error = true;
    this.message = error.message;

    if (error instanceof AppException) {
      this.errorCode = error.errorCode;
    } else if (error.response && error.response.status) {
      this.errorCode = error.response.status;
    }
    res.status(this.errorCode || 500).send(this);
  }
}
