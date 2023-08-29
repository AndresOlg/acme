import { DataTypes } from 'sequelize';
import sequelize from '../../database/mysql.js';
import Salary from './Salary.js';

const Advisor = sequelize.define('advisors', {
    advisor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience_level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_info: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    termination_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
}, { timestamps: true });

Advisor.hasOne(Salary, { onDelete: 'CASCADE', foreignKey: 'advisor_id' });

export default Advisor;