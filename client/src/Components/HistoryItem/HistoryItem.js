import './HistoryItem.css';
import React, {useState} from 'react';

const HistoryItem = ({repoDetails, setRepo}) => {
    const [owner, repository] = repoDetails.split('_');

    return (<li className='historyItem'>
        <div onClick={() => setRepo({owner, repository})}>
            {owner} / {repository}
        </div>
    </li>);
};

export default HistoryItem;