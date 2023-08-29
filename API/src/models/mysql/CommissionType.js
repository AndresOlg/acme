import { DataTypes } from 'sequelize';
import sequelize from '../../database/mysql.js';

const commissionSchema = sequelize.define('commissionSchema', {
    commission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNul: false
    },
    description: {
        type: DataTypes.STRING,
        allowNul: false
    }
});

export default commissionSchema;