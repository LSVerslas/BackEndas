import mysql from 'mysql2/promise';
import { dbConfig } from '../config.js';

export default async function dbQueryWithData(sql: string, argArr: (string | number)[] = []) {
    let conn;
    try {
        conn = await mysql.createConnection(dbConfig);
        const [rows, _fields] = await conn.execute(sql, argArr);
        // console.log('fields ===', fields);
        return [rows, null];
    } catch (error) {
        return [null, error];
    } finally {
        if (conn) conn.end();
    }
}