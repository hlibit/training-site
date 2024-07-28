const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs").promises;
// const path = require("path");


app.use(express.json());

//logger добавить дату я не смог
const logger = morgan('tiny', {
    stream: {
        write: async (message) => {
            try {
                await fs.appendFile('./config/actions.log', message);
                console.log('Log was written!');
            } catch (error) {
                console.error('Failed to write log:', error);
            }
        }
    }
});
app.use(logger);

module.exports = {app};