const { Client } = require('pg');

function createLocationTable(){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  client.query('CREATE TABLE locations (name VARCHAR, longitude DECIMAL, latitude DECIMAL);', (err, res) => {
    if (err) {
      console.log("Error while creating locations table");
      console.log(err);
    } else {
      console.log("Created locations table");
      console.log(res);
    }
    client.end();
  });

}

function insertLocation(name, long, lat){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  client.query("INSERT INTO locations VALUES ( '" + name + "'," + long + "," + lat +");", (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Location inserted");
    }
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
  client.query('SELECT * FROM locations;', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Locations:");
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
    }
    client.end();
  });
}
module.exports = {createLocationTable: createLocationTable, getLocations: getLocations,  insertLocation: insertLocation}
