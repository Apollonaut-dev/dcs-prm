import { Sequelize } from 'sequelize';

let s;

if (process.env.NODE_ENV == 'test') {
  s = new Sequelize('prm', 'root', 'rootpass', {
    dialect: 'mysql',
    host: 'db',
    port: '3306',
    logging: () => {}
  });
} else {
  s = new Sequelize('prm', 'root', 'rootpass', {
    dialect: 'mysql',
    host: 'db',
    port: '3306'
  });
}

export const sequelize = s;
