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
      const body: iUser = req.body;
      const response: iUser = await ServicePG.createUser(body);
      return new ReturnResponse(res, 201, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
  static async getAllUsers(
    _: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    try {
      const response: iUser[] = await ServicePG.getAllUsers();
      return new ReturnResponse(res, 200, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
  static async getUserById(
    req: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    try {
      const { id } = req.params;
      const response: iUser[] = await ServicePG.getUserById(id);
      return new ReturnResponse(res, 200, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
  static async deleteUser(
    req: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    const { id } = req.params;
    try {
      const response = await ServicePG.deleteUser(id);
      return new ReturnResponse(res, 200, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
  static async updateUser(
    req: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    const { id } = req.params;
    const body: iUser = req.body;
    try {
      await ServicePG.updateUser(id, body);
      return new ReturnResponse(res, 204, 'Success', undefined);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
  static async loginUser(
    req: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    try {
      const { username, password } = req.body;
      const response = await ServicePG.loginUser(username, password);
      return new ReturnResponse(res, 200, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
}
