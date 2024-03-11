import { DataTypes } from 'sequelize';
import { sequelize } from './../db.js';

import { NATO_RANK_CODES } from './NATO_OFFICER_RANKS.js';

import { ArmedService } from './ArmedService.js';

export const Rank = sequelize.define('rank', {
  NATO_code: {
    type: DataTypes.TEXT,
    validate: {
      isIn: [NATO_RANK_CODES]
    }
  },
  service_code: DataTypes.TEXT, // requirement is that they make sense, lower lexicographical order should correspond to lower ranks
  full_name: DataTypes.TEXT,
  abbreviated_name: DataTypes.TEXT
}, {
  timestamps: false
});

Rank.belongsTo(ArmedService, { foreignKey: { name: 'service_id', allowNull: false }});

await Rank.sync();