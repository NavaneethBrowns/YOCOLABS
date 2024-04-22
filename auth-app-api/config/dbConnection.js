import Sequelize from 'sequelize';
import { config } from 'dotenv';
config();

import { AuthModel } from '../api/model/auth.model.js';
import { ItemModel } from '../api/model/item.model.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLITE,
});

export const dbConnect = async () => {
  try {
    const modelFunctions = [AuthModel, ItemModel];

    for (const modelFn of modelFunctions) {
      const model = await modelFn(sequelize);
      await model.sync();
      console.log(`${model.name} model synchronized`);
    }

    console.log('Database connection established');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default sequelize;
