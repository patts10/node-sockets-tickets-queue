
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCreate = document.querySelector('button');


const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnCreate.style.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCreate.style.disabled = true;
});

socket.on('last-ticket', ( lastTicket) => {
    lblNuevoTicket.innerText = 'Ticket ' + lastTicket;
});


btnCreate.addEventListener( 'click', () => {
    
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});