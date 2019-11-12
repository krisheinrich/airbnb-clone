import 'dotenv/config';

// Get DB credentials from env
const {
  DB_USER: user,
  DB_PASSWORD: password,
  DB_HOST: host,
  DB_NAME: database
} = process.env;

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  logging: false
});
