import { iUser } from '../../common/interface/entity-pg-user';
import ModelPG from '../../infrastructure/database/postgrees';

export default class RepositoryPG {
  static async createUser(data: iUser): Promise<iUser> {
    const sql = `insert into "user" (id, username, firstname, lastname, email, password) 
    values ($1, $2, $3, $4, $5, $6 ) RETURNING *;`;
    const values = [
      data.id,
      data.username,
      data.firstname,
      data.lastname,
      data.email,
      data.password,
    ];
    const user: Array<iUser> = await ModelPG.query(sql, values);
    return user[0];
  }
  static async getUserById(data: iUser):Promise<iUser>{
    const sql = 'select * from user where id = $1;';
    const values = [
      data.id
    ];
    const response:Array<iUser> = await ModelPG.query(sql, values);
    return response[0];
  }
}

