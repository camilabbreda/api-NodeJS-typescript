import { v4 as uuidv4 } from 'uuid';
import RepositoryPG from '../repository/repository-pg-user';
import { AppException } from '../../common/error/app-exception';
import { NotFoundException } from '../../common/error/not-found-exception';
import { iUser } from '../../common/interface/entity-pg-user';
import {
  comparePassword,
  generateToken,
  hashPassword,
} from '../../common/util/auth/auth';
import validation from '../../common/util/function/validation';
import dataFormatting from '../../common/util/function/data-formatting';

export default class ServicePG {
  static async createUser(body: iUser): Promise<iUser> {
    await validation(body, 'POST');

    const data: iUser = dataFormatting(body);
    data.id = uuidv4();
    data.password = await hashPassword(data.password as string);
    const user = await RepositoryPG.createUser(data);

    if (!user) {
      throw new AppException('Error occured during user register.', 500);
    }

    user.password = 'secret';
    return user;
  }

  static async deleteUser(id: string): Promise<string> {
    await RepositoryPG.deleteUser(id);
    return 'User was successfully deleted.';
  }

  static async updateUser(id: string, body: iUser) {
    await validation(body, 'PUT', id);
    const data: iUser = dataFormatting(body);
    if (data.password) {
      data.password = Buffer.from(`${data.password}`, 'utf8').toString(
        'base64'
      );
    }
    await RepositoryPG.updateUser(id, data);
    return 'User was successfully updated.';
  }
  static async getAllUsers() {
    const response = await RepositoryPG.getAllUsers();
    if (!response || response.length === 0) {
      new NotFoundException('There is no user registered yet.');
    }
    return response;
  }
  static async getUserById(id: string) {
    const response = await RepositoryPG.getUserById({ id });
    if (!response) {
      new NotFoundException('User not found.');
    }
    return response;
  }

  static async loginUser(username: string, password: string) {
    const user = await RepositoryPG.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await comparePassword(password, user.password as string);
    if (!isMatch) {
      throw new AppException('Invalid credentials', 401);
    }
    delete user.password;
    const token = generateToken(user);
    return { token };
  }
}
