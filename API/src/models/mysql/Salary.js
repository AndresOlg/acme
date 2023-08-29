import { DataTypes } from 'sequelize';
import sequelize from "../../database/mysql.js";

const Salary = sequelize.define('salary', {
    salary_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    advisor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    monthly_salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    health_deduction: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    pension_deduction: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    risk_deduction: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
});

export default Salary;