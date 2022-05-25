const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // socket.on('disconnect', () => {
    //     console.log('Cliente desconectado', socket.id );
    // });

    socket.emit('last-ticket', ticketControl.last);
    socket.emit( 'current-state' , ticketControl.last4 );
    socket.emit('pending-tickets', ticketControl.tickets.length );

    socket.on('next-ticket', ( payload, callback ) => {
        
        const nextTicket = ticketControl.nextTicket();
        callback( nextTicket );
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length );
    });

    socket.on('atender-ticket', ({escritorio}, callback) => {
       if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
       }

       const ticket = ticketControl.serveTicket( escritorio );

       socket.broadcast.emit( 'current-state' , ticketControl.last4 );
       socket.emit('pending-tickets', ticketControl.tickets.length );
       socket.broadcast.emit('pending-tickets', ticketControl.tickets.length );

       if ( !ticket ) {
           callback({
               ok: false,
               msg: 'No existen tickets pendientes'
           });
       } else {
           callback({
               ok: true,
               ticket
           })
       }
    })
}



module.exports = {
    socketController
}

