import pg from "pg";

// Notes for myself:
// Taken after the debrief
/* 
When running/invoking/calling (what the hell is even the best term to use?) a class constructor function Pool, the configurations could be provided also as an argument (object):

Configurations:
PGHOST=localhost
PGUSER=postgres
PGDATABASE=postgres
PGPASSWORD=mypassword
PGPORT=5432

Example taken partly from: https://node-postgres.com/api/pool
Might be mistaken for correct property names eg. database, password, port:
(TODO: remember to check later if it works with these property keys)

const pool = new pg.Pool({
  host: 'localhost',
  user: 'database-user',
  database: 'postgres',
  password: 'my password',
  port: 5432
})

OR

As we have now done, provided within the .env file. 

Hence, by running the function, database connection related configurations, are implicitly(?, in search for better word) looked within environment variables, in this case first within local .env file but what if not found? 
Then through 'global' environment variables on the computer?
*/

const pool = new pg.Pool();

export default pool;