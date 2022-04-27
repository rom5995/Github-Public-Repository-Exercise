'use strict';
const {getRepoHistory} = require('./src/historyHandler');

const responseHeaders = {
    "Content-Type" : "application/json",
    "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Credentials" : true,
    "Access-Control-Allow-Origin" : "*",
    "X-Requested-With" : "*"
};

exports.handler = async (event, context) => {
    console.log(`request: ${JSON.stringify(event)}`);

    let responseCode = 200, responseBody;

    try {
        responseBody = await getRepoHistory();
    } catch (error) {
        console.log("error", error);
        responseCode = 500;
    } finally {
        context.callbackWaitsForEmptyEventLoop = false;
    }

    const response = {
        statusCode: responseCode,
        headers: responseHeaders,
        body: JSON.stringify(responseBody)
    };
    console.log(`response: ${JSON.stringify(response)}`);

    return response;
}