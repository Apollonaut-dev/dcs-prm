import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

import { ArmedService } from './ArmedService.js';
import { User } from './User.js';

export const Squadron = sequelize.define('squadron', {
  squadron_name: DataTypes.TEXT,
}, {
  timestamps: false
});

Squadron.belongsTo(ArmedService, { foreignKey: { name: 'service_id', allowNull: false } });
Squadron.belongsTo(User, { foreignKey: { name: 'owner_id', allowNull: false } });

await Squadron.sync();