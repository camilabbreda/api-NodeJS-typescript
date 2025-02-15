import { BadRequestException } from '../../common/error/bad-request-esception';
import { iUser } from '../../common/interface/entity-pg-user';
import ModelPG from '../../infrastructure/database/postgrees';

export default class RepositoryPG extends ModelPG {
  static async createUser(data: iUser): Promise<iUser> {
    const sql = `insert into "user" (id, username, firstname, lastname, email, password) 
    values ($1, $2, $3, $4, $5, $6 ) RETURNING *`;
    const values = [
      data.id,
      data.username,
      data.firstname,
      data.lastname,
      data.email,
      data.password,
    ];
    const modelPG = new ModelPG();
    try {
      const user: Array<iUser> = await modelPG.query(sql, values);
      return user[0];
    } finally {
      modelPG.close();
    }
  }
  static async getUserById(data: iUser): Promise<iUser> {
    const sql = 'select * from "user" where id = $1';
    const values = [data.id];
    const modelPG = new ModelPG();
    try {
      const response: Array<iUser> = await modelPG.query(sql, values);
      return response[0];
    } finally {
      modelPG.close();
    }
  }
  static async getAllUsers(): Promise<Array<iUser>> {
    const sql = 'select * from "user"';
    const modelPG = new ModelPG();
    try {
      const response: Array<iUser> = await modelPG.query(sql);
      return response;
    } finally {
      modelPG.close();
    }
  }

  static async getUserByUsername(username: string) {
    const sql = 'select * from "user" where username = $1';
    const values = [username];
    const modelPG = new ModelPG();
    try {
      const response: Array<iUser> = await modelPG.query(sql, values);
      return response[0];
    } finally {
      modelPG.close();
    }
  }
  static async getUserByEmail(email: string) {
    const sql = 'select * from "user" where email = $1';
    const values = [email];
    const modelPG = new ModelPG();
    try {
      const response: Array<iUser> = await modelPG.query(sql, values);
      return response[0];
    } finally {
      modelPG.close();
    }
  }
  static async deleteUser(id: string) {
    const sql = 'delete from "user" where id = $1';
    const values = [id];
    const modelPG = new ModelPG();
    try {
      const response: any = await modelPG.query(sql, values);
      return response[0];
    } finally {
      modelPG.close();
    }
  }

  static async updateUser(id: string, data: iUser) {
    const objectKey = Object.keys(data) as Array<keyof iUser>;
    const filteredKeys = objectKey.filter((key) => data[key] !== undefined);
    if (filteredKeys.length === 0) {
      throw new BadRequestException('No valid fields to update.');
    }
    const setClause = filteredKeys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = filteredKeys.map((key) => data[key]);
    values.push(id);
    const sql = `UPDATE "user" SET ${setClause} where id = $${values.length}`;
    const modelPG = new ModelPG();
    try {
      await modelPG.query(sql, values);
      return;
    } finally {
      modelPG.close();
    }
  }
}
