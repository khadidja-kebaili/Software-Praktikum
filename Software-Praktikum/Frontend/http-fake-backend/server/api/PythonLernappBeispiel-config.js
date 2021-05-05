'use strict';

/**
* Config file for a https://github.com/micromata/http-fake-backend to
* mock the PythonBankBeispiel backend.
*
* Just place in ./server/api folder.
*/

const SetupEndpoint = require('./setup/');

const prefix = "/matches"

module.exports = SetupEndpoint({
    name: 'matches',
    urls: [{
        params: '/matches',
        requests: [{
            method: 'GET',
            response: '/response-files/matches.json'
        },
        ]
    },  ]
    }, 
    
        
);

