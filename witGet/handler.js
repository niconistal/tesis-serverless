'use strict';

const Wit = require('node-wit').Wit;
const Promise = require('promise');


const actions = {
    say(sessionId, context, message, cb) {
            console.log(message);
            cb();
        },
        merge(sessionId, context, entities, message, cb) {
            cb(context);
        },
        error(sessionId, context, error) {
            console.log(error.message);
        }
};

function witProcess(text) {
    const context = {};
    return new Promise(function(resolve, reject) {
        client.message(text, context, function(error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

const token = 'SKXDSJQMQBNUU3GGT3GB7OCQSD3FL6G6';

const client = new Wit(token, actions);


module.exports.handler = function(event, context, cb) {
    console.log('event:', event);
    return witProcess(event.witQuery)
    .then((response) => {
            return cb(null, {
                message: response
            });
        });
};
