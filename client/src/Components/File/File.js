import './File.css';
import React from 'react';

const File = ({filename}) => {
    return (<li>
        {filename}
    </li>);
};

export default File;