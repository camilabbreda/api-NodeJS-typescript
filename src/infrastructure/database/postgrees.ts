import { Pool, QueryResult } from 'pg';

console.log(process.env.PG_HOST, process.env.PG_DATABASE, `${process.env.PG_USER}`,`${process.env.PG_PASSWORD}` );

const pool = new Pool({
  host: process.env.PG_HOST,
  port: parseInt(`${process.env.PG_PORT}`),
  database: process.env.PG_DATABASE,
  user: `${process.env.PG_USER}`,
  password: `${process.env.PG_PASSWORD}`,
});
export default class ModelPG {
  static async query(sql: string, values?: any[]): Promise<any[]> {
    let client;
    try {
      client = await pool.connect();
      const response: QueryResult = await client.query(sql, values);
      return response.rows;
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}
