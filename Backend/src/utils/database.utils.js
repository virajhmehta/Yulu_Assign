
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'admin',
  database: 'user',
});

export default sequelize;
