const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "repositories";

function generateId(owner, repository) {
    return `${owner}_${repository}`
}

async function saveRepo(owner, repository, tree) {
    try {
        const repoItem = {
            TableName: TABLE_NAME,
            Item: {
                id: generateId(owner, repository),
                tree: JSON.stringify(tree)
            }
        }
        console.log("save to DB");
        await docClient.put(repoItem).promise();
        console.log(`${repoItem.Item.id} saved successfully`);
    } catch (error) {
        console.log("error on save to db", error);
    }
}

async function getRepoDB(owner, repository) {
    try {
        const query = {
            TableName: TABLE_NAME,
            Key: {
                id: generateId(owner, repository)
            }
        };
        console.log("try to get from db");

        const response = await docClient.get(query).promise();
        if (response?.Item?.tree) {
            return JSON.parse(response.Item.tree);
        }

        return;
    } catch (error) {
        console.log("error on get repo from DB", error);
    }
}

module.exports = {
    saveRepo,
    getRepoDB
}