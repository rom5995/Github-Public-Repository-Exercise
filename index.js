const {getRepoContentsByPath} = require('./src/getRepoTree');

exports.handler = async (event) => {
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