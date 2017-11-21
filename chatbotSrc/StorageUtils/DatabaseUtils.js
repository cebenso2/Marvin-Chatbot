const { Client } = require('pg');


function createDatabase(){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();

  /*client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
  });*/
  client.query("CREATE TABLE Persons (
    LocationName varchar(255),
    Latitude FLOAT,
    Longitude FLOAT
  );", (err, res) => {
    console.log(err);
    console.log(res);
  });
  client.end();
}
