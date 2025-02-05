import { Pool, QueryResult } from 'pg';

export default class ModelPG {
  private pool: Pool;
  constructor(){
    this.pool = new Pool({
      host: process.env.PG_HOST,
      port: parseInt(`${process.env.PG_PORT}`),
      database: process.env.PG_DATABASE,
      user: `${process.env.PG_USER}`,
      password: `${process.env.PG_PASSWORD}`,
    });
  }
  
  async query<T = any>(sql: string, values?: any[]): Promise<T[]> {
    let client;
    try {
      client = await this.pool.connect();
      const response: QueryResult = await client.query(sql, values);
      return response.rows;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
