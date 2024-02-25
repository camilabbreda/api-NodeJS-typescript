import { Request, Response } from 'express';
import { iUser } from '../../common/interface/entity-pg-user';
import ServicePG from '../service/service-pg-user';
import { ReturnResponse } from '../../common/dtos/return-response.dto';
import { ReturnError } from '../../common/dtos/return-error.dto';

export default class ControllerPG {
  static async createUser(
    req: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    try {
      const  body: iUser = req.body;
      const response: iUser = await ServicePG.createUser(body);
      return new ReturnResponse(res, 201, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
}
