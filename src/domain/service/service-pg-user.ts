import { iUser } from '../../common/interface/entity-pg-user';
import { v4 as uuidv4 } from 'uuid';
import RepositoryPG from '../repository/repository-pg-user';
import { AppException } from '../../common/error/app-exception';
import validation from '../../common/util/function/validation';
import dataFormatting from '../../common/util/function/data-formatting';

export default class ServicePG {
  static async createUser(body: iUser): Promise<iUser> {
    await validation(body, 'POST');

    const data: iUser = dataFormatting(body);
    data.id = uuidv4();
    data.password = Buffer.from(`${data.password}`, 'utf8').toString('base64');
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
}
