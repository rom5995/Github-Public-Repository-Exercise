import {useState, useEffect} from 'react';
import RepoService from '../../Services/RepoService';
import Folder from '../Folder/Folder';

const RepoTree = ({RepoTree}) => {
    const {owner, repository, tree} = RepoTree;
    
    return (
        <div>
            <h2>
                {owner} / {repository}
            </h2>
            <Folder folder={tree} />
        </div>
    );
    
};

export default RepoTree;