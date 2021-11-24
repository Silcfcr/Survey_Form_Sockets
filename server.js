// npm init -y
// npm i express
//npm i ejs 
// npm install express-session
// mkdir views // create views folder
// touch index.ejs // create index.ejs file in views folder


const { application } = require('express');
const express = require( 'express' );
// var session = require('express-session');

const app = express();
// to use ejs
// app.use(session({ secret: 'codingdojorocks' }));

app.use(express.static(__dirname + "/public"));

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

const server = app.listen(8888)
const io = require ('socket.io')(server);

app.get( '/', function( request, response ){
    response.render( 'form');
});
// app.use( express.urlencoded({extended:true}) );

io.on( 'connection', function( socket ){
    console.log( "Someone just connected!" );
//     socket.on( 'greeting', function( data ){
//         let info = {
//             message : `Hello there ${data.name} nice to have you here!`
//         }
//         socket.emit( 'information',  info );
//     });

//     socket.on( 'general', function( data ){
//         io.sockets.emit( 'listenAll', {message: "Broadcast message"} )
//     });

    socket.on( 'posting_form', function( data ){
        let updated_message = {
            message: `Hello there ${data.name} from ${data.location}. Your favorite language seems to be ${data.language} and this is what you have to say: ${data.comment} `
        }
        let rand_number = Math.floor(Math.random() * 100) + 1;
        io.sockets.emit( 'updated_message', updated_message ); 
        io.sockets.emit( 'random_number', rand_number );
        
    });

    // socket.on( 'greeting', function( data ){
    //             let info = {

    //             socket.emit( 'information',  info );
    //         });
    
});
