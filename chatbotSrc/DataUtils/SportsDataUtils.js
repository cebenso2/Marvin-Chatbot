// request Request
var Base64 = require('../Utils//Base64');
'use strict';

const httpTransport = require('https');
const responseEncoding = 'utf8';

//function for getting last game result given the league and city
//sends string output to callback function on completion
//based on sample code given on website
function getLastGame(sport, city, callback) {
  //sets up headers
    const httpOptions = {
        hostname: 'api.mysportsfeeds.com',
        port: '443',
        path: "/v1.1/pull/"+sport+"/current/team_gamelogs.json?team="+city,
        method: 'GET',
        headers: {"Authorization":"Basic " + Base64.btoa(process.env.SPORTS_USERNAME + ":" + process.env.SPORTS_PASSWORD)}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';

        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;
            }
        }).on('end', () => {
            //parses response into easy string result
            responseStr = responseBufs.length > 0 ?
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            let teamData = JSON.parse(responseStr);
            let games = teamData.teamgamelogs.gamelogs;
            let lastGame = games[games.length-1];
            let date = lastGame.game.date;
            let team = lastGame.team.City + " " + lastGame.team.Name
            let hometeam = lastGame.game.homeTeam.City + " " + lastGame.game.homeTeam.Name
            let awayteam = lastGame.game.awayTeam.City + " " + lastGame.game.awayTeam.Name
            let opponent = hometeam === team ? awayteam : hometeam;
            console.log(lastGame.stats);
            let pointsFor = lastGame.stats.Pts['#text'];
            let pointsAgainst = lastGame.stats.PtsAgainst['#text'];
            let result = "Last Game: "+date +"\n";
            result += team + ": " +pointsFor +"\n";
            result += opponent + ": " +pointsAgainst;
            //passed to callback
            callback(result);
        });

    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
}

function getTeams(sport, callback) {
  //sets up headers
    const httpOptions = {
        hostname: 'api.mysportsfeeds.com',
        port: '443',
        path: "/v1.1/pull/"+sport+"/current/overall_team_standings.json",
        method: 'GET',
        headers: {"Authorization":"Basic " + Base64.btoa(process.env.SPORTS_USERNAME + ":" + process.env.SPORTS_PASSWORD)}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';

        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;
            }
        }).on('end', () => {
            //parses response into easy string result
            responseStr = responseBufs.length > 0 ?
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            let teamData = JSON.parse(responseStr);
            let teams = teamData.overallteamstandings.teamstandingsentry;
            console.log(teams)
            let result = team.map(team => teams.name + ","+teams.Abbreviation);
            /*let lastGame = games[games.length-1];
            let date = lastGame.game.date;
            let team = lastGame.team.City + " " + lastGame.team.Name
            let hometeam = lastGame.game.homeTeam.City + " " + lastGame.game.homeTeam.Name
            let awayteam = lastGame.game.awayTeam.City + " " + lastGame.game.awayTeam.Name
            let opponent = hometeam === team ? awayteam : hometeam;
            console.log(lastGame.stats);
            let pointsFor = lastGame.stats.Pts['#text'];
            let pointsAgainst = lastGame.stats.PtsAgainst['#text'];
            let result = "Last Game: "+date +"\n";
            result += team + ": " +pointsFor +"\n";
            result += opponent + ": " +pointsAgainst;*/
            //passed to callback
            callback(result);
        });

    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
}

module.exports = {getLastGame: getLastGame, getTeams: getTeams}
