import './History.css';
import React from 'react';
import HistoryItem from '../HistoryItem/HistoryItem';

const History = ({historyItems, setRepo}) => {
    return (
    <div>
        <ul className='historyList'>
            {historyItems.map(item => {
                return (
                    <div key={item}>
                        <HistoryItem repoDetails={item} setRepo={setRepo}/>
                    </div>
                );
            })}
        </ul>
    </div>
    );
};

export default History;