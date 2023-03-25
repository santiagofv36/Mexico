import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class MySQLService {
  private pool: mysql.Pool;

  constructor() {
    console.log(process.env.DBHOST)
    this.pool = mysql.createPool({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWD,
      database: process.env.DBNAME,
    });
  }

  async execute(sp: string, parameters?: any[]): Promise<any> {
    const conn = await this.pool.getConnection();
    
    try {
        const reps = '?'.repeat(parameters.length).split('').join(',');
      const [rows] = await conn.query(`call ${sp} (${reps})`, parameters);
      return rows;
    } 
    catch(e){
        console.log(e);
    }
    finally {
      conn.release();
    }
  }

}
