import { iUser } from '../../common/interface/entity-pg-user';
import { v4 as uuidv4 } from 'uuid';
import RepositoryPG from '../repository/repository-pg-user';
import { AppException } from '../../common/error/app-exception';
import { BadRequestException } from '../../common/error/bad-request-esception';

export default class ServicePG {
  static async createUser(body: iUser): Promise<iUser> {
    if (
      !body.username ||
      !body.firstname ||
      !body.lastname ||
      !body.email ||
      !body.password
    ) {
      throw new BadRequestException(
        'Please, inform all data from user (username, firstname, lastname, email, password )'
      );
    }
    body.id = uuidv4();
    body.password = Buffer.from(`${body.password}`, 'utf8').toString('base64');
    const user: iUser | null = await RepositoryPG.createUser(body);
    if (!user) {
      throw new AppException('Ocorreu um erro ao registrar usuário.', 500);
    }
    user.password = 'secret';
    return user;
  }
}
