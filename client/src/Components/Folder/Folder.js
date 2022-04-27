import './folder.css';
import React from 'react';
import File from '../File/File';

const Folder = ({folder}) => {
    return (<ul>
        {Object.keys(folder).map(itemName => {
            const item = folder[itemName]
            if (Object.keys(item).length === 0) {
                return (<File key={itemName} filename={itemName} />)
            } else {
                return (
                <li className='folder' key={itemName}>
                    <div>
                        {itemName}
                    </div>
                    <div>
                        <Folder folder={item}/>
                    </div>
                </li>)
            }
        })}
    </ul>);
};

export default Folder;