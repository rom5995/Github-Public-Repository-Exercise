const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "repositories";

exports.getRepoHistory = async function() {
    try {
        const query = {
            TableName: TABLE_NAME,
            ProjectionExpression: "id"
        };

        const response = await docClient.scan(query).promise();
        if (response?.Items && response?.Count > 0) {
            return response?.Items.map(item => item.id);    
        }

        return [];
    } catch (error) {
        console.log("error on get list of repos from DB", error);
    }
}