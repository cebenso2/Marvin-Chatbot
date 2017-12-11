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

//create the email table
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

//create the
function createTeamTable(){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  client.query('CREATE TABLE team (userpsid VARCHAR, league VARCHAR, name VARCHAR, city VARCHAR);', (err, res) => {
    if (err) {
      console.log("Error while creating locations table");
      console.log(err);
    } else {
      console.log("Created teams table");
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

function getEmailToken(user_psid){
  console.log("getEmail");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  return client.query("SELECT * FROM emails WHERE userpsid='"+user_psid+"';").then((result) => {
    let emailToken = null
    for (let row of result.rows) {
      console.log(row);
      console.log(row.token);
      if(row.token != 'null' && row.token != '[object Object]'){
        emailToken = row.token;
        break;
      }
    }
    client.end();
    console.log(emailToken);
    if(emailToken){
      emailToken = JSON.parse(emailToken);
    }
    return emailToken;
  });
}
function getUserPsid(email){
  console.log("getEmail");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  return client.query("SELECT * FROM emails WHERE email='"+email+"';").then((result) => {
    client.end();
    if (result.rows.length === 0){
      return null;
    } else {
      console.log(result.rows[0].userpsid);
      return result.rows[0].userpsid
    }
  });
}

function PrintTeams(){
  console.log("printEmails");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  return client.query("SELECT * FROM team;").then((result) => {
    client.end();
    console.log(result);
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

//get teams for a user
function getTeams(user_psid){
  console.log("getLocations");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  return client.query("SELECT * FROM team WHERE userpsid='"+user_psid+"';").then((result) => {
    let teams = [];
    for (let row of result.rows) {
      teams.push({
        league: row.league,
        name: row.name,
        city: row.city,
      });
    }
    client.end();
    console.log(teams);
    return teams;
  });
}
//insert a location for a user - stores a location in the locations table using the users psid
function insertTeam(user_psid, league, name, city){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  client.query("INSERT INTO team VALUES ( '" +user_psid +"','" + league + "','" + name + "','" + city+"');", (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Team added");
    }
    client.end();
  });
}

module.exports = {createTeamTable: createTeamTable, createLocationTable: createLocationTable, getLocations: getLocations,  insertLocation: insertLocation, createEmailTable: createEmailTable, getEmailToken: getEmailToken, insertEmail: insertEmail, getUserPsid: getUserPsid, PrintTeams: PrintTeams, getTeams: getTeams, insertTeam: insertTeam}
