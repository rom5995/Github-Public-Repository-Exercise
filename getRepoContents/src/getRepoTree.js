const axios = require('axios');
axios.defaults.headers.common['Authorization'] = process.env.GITHUB_TOKEN;

async function getRepoContentsByPath(owner, repository, path = '') {
    const {data} = await axios.get(`https://api.github.com/repos/${owner}/${repository}/contents/${path}`);
    const fileSystem = {}, dirRequests = [];

    data.forEach(item => {
        if (item.type === "file") {
            fileSystem[item.name] = {};
        } else if (item.type === "dir") {
            dirRequests.push(getRepoContentsByPath(owner, repository, `${path}/${item.name}`));
        }
    });

    const dirs = await Promise.all(dirRequests);
    dirs.forEach(([dirName, contents]) => {
        fileSystem[dirName] = contents;
    });

    if (path !== '') {
        return [path.split("/").splice(-1)[0], fileSystem];        
    } else {
        return fileSystem;
    }
}

exports.getRepoContentsByPath = getRepoContentsByPath;