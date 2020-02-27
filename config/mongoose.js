const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug');
const config = require('./dotenvconfig');

// connect to mongo db
let mongoUri = '';
let options = {};

if (config.mongo.host !== 'localhost') {
    mongoUri = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database + '?authSource=' + config.mongo.authSource;

    // user and pass
    options = {
        user: config.mongo.username,
        pass: config.mongo.password,
        keepAlive: 1,
        //keepAliveInitialDelay: 300000,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    };
} else {
    mongoUri = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database + '';
    // not user and pass
    options = {
        keepAlive: 1,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    }
}


mongoose.connect(mongoUri, options);
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

