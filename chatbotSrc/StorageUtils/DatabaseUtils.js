const { Client } = require('pg');

//create the location database
function createLocationTable(){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  client.query('CREATE TABLE locations (userpsid VARCHAR, name VARCHAR, longitude DECIMAL, latitude DECIMAL);', (err, res) => {
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

//create the location database
function createEmailTable(){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  client.query('CREATE TABLE emails (userpsid VARCHAR, email VARCHAR, token VARCHAR);', (err, res) => {
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


//insert a location for a user - stores a location in the locations table using the users psid
function insertLocation(user_psid, name, long, lat){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  client.query("INSERT INTO locations VALUES ( '" +user_psid +"','" + name + "'," + long + "," + lat +");", (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Location inserted");
    }
    client.end();
  });

}

//get locations for a user
function getLocations(user_psid){
  console.log("getLocations");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  return client.query("SELECT * FROM locations WHERE userpsid='"+user_psid+"';").then((result) => {
    let locations = [];
    for (let row of result.rows) {
      locations.push(row.name);
    }
    client.end();
    return locations;
  });
}

function getEmail(user_psid){
  console.log("getEmail");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  return client.query("SELECT * FROM emails WHERE userpsid='"+user_psid+"';").then((result) => {
    let emails = [];
    for (let row of result.rows) {
      emails.push(row.email +"," + row.token);
    }
    client.end();
    return locations;
  });
}

    //insert a location for a user - stores a location in the locations table using the users psid
function insertEmail(user_psid, name, token){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  client.query("INSERT INTO emails VALUES ( '" +user_psid +"','" + name + "','" + token +"');", (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email added");
    }
    client.end();
  });

}

module.exports = {createLocationTable: createLocationTable, getLocations: getLocations,  insertLocation: insertLocation, createEmailTable: createEmailTable, getEmail: getEmail, insertEmail: insertEmail}
