'use strict';
const {getRepoContentsByPath} = require('./src/getRepoTree');
const axios = require('axios');


exports.handler = async (event) => {
    axios.defaults.headers.common['Authorization'] = "token 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";
    console.log("request: " + JSON.stringify(event));

    let responseCode = 200, owner, repository, responseBody;

    if (event.queryStringParameters) {
        if (event.queryStringParameters.owner) {
            console.log("Received owner: " + event.queryStringParameters.owner);
            owner = event.queryStringParameters.owner;
        }

        if (event.queryStringParameters.repository) {
            console.log("Received repository: " + event.queryStringParameters.repository);
            repository = event.queryStringParameters.repository;
        }

        try {
            responseBody = await getRepoContentsByPath(owner, repository); 
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
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response));

    return response;
}