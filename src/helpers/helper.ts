import mysql from 'mysql2/promise';
import { dbConfig } from '../config.js';

type QueryResult<T> = [T, null] | [null, Error];

export default async function dbQueryWithData(sql: string, argArr: (string | number)[] = []) {
  let conn;
  try {
    // prisijungti prie DB
    conn = await mysql.createConnection(dbConfig);
    // atlikti veikma
    const [rows, _fields] = await conn.execute(sql, argArr);
    // console.log('fields ===', fields);
    // grazinti duomenis
    return [rows, null];
  } catch (error) {
    return [null, error];
  } finally {
    // atsijungti nuo DB
    if (conn) conn.end();
  }
}