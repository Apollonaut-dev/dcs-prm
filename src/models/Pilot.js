import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Pilot = sequelize.define('pilot', {
  aircraft_number: {
    type: DataTypes.INTEGER,
    validate: { min: 0 }
  },
  birthday: DataTypes.DATE,
});

// const jane = await User.create({
//   username: 'janedoe',
//   birthday: new Date(1980, 6, 20),
// });

// const users = await User.findAll();

console.log(users);