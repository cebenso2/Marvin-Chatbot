const { Client } = require('pg');

function createDatabase(){
  console.log("create db");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  client.query('CREATE TABLE Locations (LocationName varchar(255),Latitude FLOAT,Longitude FLOAT);', (err, res) => {
    console.log("create db");
    console.log(err);
    console.log(res);
    client.end();
  });

}

function getLocations(){
  console.log("getLocations");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  client.query('SELECT LocationName,Locations FROM information_schema.tables;', (err, res) => {
    console.log("locations:");
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
module.exports = {createDatabase: createDatabase, getLocations: getLocations}
