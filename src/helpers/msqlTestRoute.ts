import mysql from 'mysql2/promise';
import { dbConfig } from '../config.js';

export default async function testConnection() {
    let conn;
    try {
        conn = await mysql.createConnection(dbConfig);
        await conn.query('SELECT 1');
        console.log('Succesfuly conected to mysql');
    } catch (error) {
        console.log('testConnection failed, did you start XAMPP mate?');
        console.log(error);
    } finally {
        if (conn) conn.end();
    }
}