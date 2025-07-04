import chalk from "chalk";
import mysql2 from "mysql2";

const db_connection=async ()=> {
    try {
        const connection = await mysql2.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'test'
        });

        console.log(chalk.green('✅ Connected to MySQL'));
        return connection;
    } catch (error) {
        console.error(chalk.red('❌ MySQL connection failed:', error.message));
    }
}
export default db_connection;