import Sequelize from "sequelize";


const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT, NODE_ENV } = process.env;

// without rejectUnauthorized will cause error: self-signed certificate.
// TODO: Learn more about SSL later.
// NODE_ENV -

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
  ...(NODE_ENV === "production" && {
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    }
  }
  }),
});

console.log("Sequelize instance created.");

export async function connectDB() {
  try {
    await sequelize.sync({ alter: true, logging: false });
  } catch (error) {
    console.log(error);
  }
}


export default sequelize;
