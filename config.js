"use strict";



module.exports = {
    jwtKey: {
        jwtFromRequest: ExtractJwt,
        secretOrKey: 'TfbTq2NfLzqMcbVY9EpGQ2p'
    },

    serverPort: 3000,

    db: {
        url: "mongodb://admin1:hadshot21@ds239055.mlab.com:39055/server-koa"
    },


    expiresIn: '1 day'
};