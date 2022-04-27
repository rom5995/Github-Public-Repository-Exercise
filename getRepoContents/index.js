'use strict';
const {getRepoContentsByPath} = require('./src/getRepoTree');
const axios = require('axios');
const {getRepoDB, saveRepo} = require('./src/dynamoDBHandler');


exports.handler = async (event) => {
    axios.defaults.headers.common['Authorization'] = "token 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";
    console.log("request: " + JSON.stringify(event));

    let responseCode = 200, responseBody;
    const owner = event?.queryStringParameters?.owner,
     repository = event?.queryStringParameters?.repository;

    if (owner && repository) {
        console.log("Received owner: " + owner);
        console.log("Received repository: " + repository);

        try {
            responseBody = await getRepoDB(owner, repository);
            console.log("repoDB", responseBody);
            if (!responseBody) {
                responseBody = await getRepoContentsByPath(owner, repository);
                await saveRepo(owner, repository, responseBody); 
            }
        } catch (error) {
            console.log("error", error);
            responseBody = "repository doesn't exists";
            responseCode = 500;
        }

    } else {
        responseBody = "missing parameters";
        responseCode = 400;
    }

    const response = {
        statusCode: responseCode,
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,POST",
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        },
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response));

    return response;
}