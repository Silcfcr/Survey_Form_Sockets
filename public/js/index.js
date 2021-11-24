console.log("connection!")
let socket = io( 'http://localhost:8888' );

$( '.addUser' ).on( 'submit', function(event){
    event.preventDefault();
    console.log("Hello!")

    let name = $( '#name' ).val();
    let location = $( '#location' ).val();
    let language = $('#language').val();
    let comment = $('#comment').val();

    let send = {
        name: name,
        location : location,
        language : language,
        comment : comment
    };

    console.log(send);

    socket.emit( 'posting_form', send );
});

socket.on( 'updated_message', function( data ){
    let newMessage = `<p> ${data.message} </p>`;
    $( '.numberBox' ).append( newMessage );
});

socket.on( 'random_number', function( data ){
    console.log(data);
    let newNumber = `<p> ${data} </p>`;
    $( '.numberBox' ).append( newNumber );
});