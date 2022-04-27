'use strict';
const {getRepoContentsByPath} = require('./src/getRepoTree');
const {getRepoDB, saveRepo} = require('./src/dynamoDBHandler');

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
    const owner = event?.queryStringParameters?.owner,
     repository = event?.queryStringParameters?.repository;

    if (owner && repository) {
        try {
            responseBody = await getRepoDB(owner, repository);
            if (!responseBody) {
                responseBody = await getRepoContentsByPath(owner, repository);
                await saveRepo(owner, repository, responseBody); 
            }
        } catch (error) {
            console.log("error", error);
            responseBody = "repository doesn't exists";
            responseCode = 500;
        } finally {
            context.callbackWaitsForEmptyEventLoop = false;
        }

    } else {
        responseBody = "missing parameters";
        responseCode = 400;
    }

    const response = {
        statusCode: responseCode,
        headers: responseHeaders,
        body: JSON.stringify(responseBody)
    };

    console.log(`response: ${JSON.stringify(response)}`);

    return response;
}