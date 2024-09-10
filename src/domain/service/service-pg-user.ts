import { iUser } from '../../common/interface/entity-pg-user';
import { v4 as uuidv4 } from 'uuid';
import RepositoryPG from '../repository/repository-pg-user';
import { AppException } from '../../common/error/app-exception';
import { BadRequestException } from '../../common/error/bad-request-esception';
import validation, {
  emailValidation,
  userNameValidation,
} from '../../common/util/function/validation';
import dataFormatting from '../../common/util/function/data-formatting';

export default class ServicePG {
  static async createUser(body: iUser): Promise<iUser> {
    await validation(body);
    
    const data: iUser = dataFormatting(body);
    data.id = uuidv4();
    data.password = Buffer.from(`${data.password}`, 'utf8').toString('base64');
    const user = await RepositoryPG.createUser(data);

    if (!user) {
      throw new AppException('Ocorreu um erro ao registrar usuário.', 500);
    }
    
    user.password = 'secret';
    return user;
  }
}
