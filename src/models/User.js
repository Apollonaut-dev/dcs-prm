// Actual Database User
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const User = sequelize.define('users', {
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [64, 64],
      is: /^[0-9a-f]{64}$/i
    }
  },
  verified: DataTypes.BOOLEAN
}, {
  timestamps: true
});

await User.sync();