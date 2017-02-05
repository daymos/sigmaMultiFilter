'use strict'
var Path = require('path');
var Hapi = require('hapi');
var Inert = require('inert');
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('arctic.json', 'utf8'));
var preppedData = JSON.parse(fs.readFileSync('preppedArctic.json', 'utf8'));
var utils = require('./utils.js');

var server = new Hapi.Server();
server.connection({ 
    port: process.env.PORT || 3000, 
    routes: { 
        cors: true,
        files:{
            relativeTo: Path.join(__dirname, '../src')
        }
    }
});

server.register(Inert, ()=>{})

server.route({
    method: 'GET',
    path: '/',
    handler: function(request,reply){
        reply('server is listening')
    }
})

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

server.route({
    method: 'GET',
    path: '/data',
    handler: function(request,reply){
        console.log('GET request: ', request.url.path)
        reply(JSON.stringify(preppedData))
    }
})

server.route({
    method: 'GET',
    path: '/prepdata',
    handler: function(request,reply){
        var a = utils(obj)
            reply('prepping data on the server')
            fs.writeFile("./preppedArctic.json", JSON.stringify(a), function(err) {
                if(err) { return console.log(err) }
                console.log("The file was saved!");
            }); 
    }
})

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
})
