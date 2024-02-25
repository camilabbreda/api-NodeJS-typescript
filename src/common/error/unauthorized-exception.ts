import { AppException } from './app-exception';

export class UnauthorizedException extends AppException {
  constructor() {
    super('Unauthorized', 401);
  }
}
