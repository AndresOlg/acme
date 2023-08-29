import { DataTypes } from 'sequelize';
import sequelize from '../../database/mysql.js';
import Advisor from '../mysql/Advisor.js';

const Metrics = sequelize.define('advisor', {
    metrics_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    advisor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    month: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sales_mounth: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    commission_earned: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

Metrics.hasOne(Advisor, { onDelete: 'CASCADE', foreignKey: 'advisor_id' });

export default Metrics;