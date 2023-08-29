import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});


// Connection  MySQL
sequelize
    .authenticate()
    .then(() => {
        console.log('MySQL connected to the database');
    })
    .catch((error) => {
        console.error('MySQL connection error', error);
    });

export default sequelize;