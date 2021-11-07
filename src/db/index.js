import Sequelize from "sequelize";


const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
});

console.log("Sequelize instance created.");

export async function connectDB() {
  try {
    await sequelize.sync({ alter: true, logging: false, raw: true });
  } catch (error) {
    console.log(error);
  }
}


export default sequelize;
