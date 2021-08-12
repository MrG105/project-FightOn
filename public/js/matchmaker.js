const Matchmaker = require("gamemaker");
const router = require("express").Router();

function startMatch(players) {
    console.log(`Match started with players: ${players.map(e => e.player.name)}`); 
};

function getPlayerID(player) {
    return player.id; 
};

function matchPlayers(players) {
   
    return true;
};

function sortQueue(a, b) {
    return a - b
};
const defaultQueue = []; 
const matcher = new Matchmaker(startMatch, getPlayerID, {
    checkInterval: 2000, 
    maxMatchSize: 2,
    matchPlayersFunction: matchPlayers, 
    sortQueueFunction: sortQueue, 
    queue: defaultQueue, 
});
matcher.init(); 
matcher.addPlayer({name:"Bob", id:0}); 
matcher.addPlayer({name:"John", id:1});
matcher.getPlayerByID(1)
