import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

import { SupportedServices } from './NATO_OFFICER_RANKS.js';

export const ArmedService = sequelize.define('armedService', {
  service_name: {
    type: DataTypes.STRING,
    validate: {
      isIn: [SupportedServices]
    },
    unique: true
  },
  long_name: {
    type: DataTypes.STRING, 
  }
}, {
  timestamps: false
});

await ArmedService.sync();
