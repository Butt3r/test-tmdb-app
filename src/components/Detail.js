import React from 'react';
import PropTypes from 'prop-types';
import config from '../api/config';

import './Detail.css';


const baseUrl = config.API_ROOT;


function Detail({})
{
    return (
        <div>
            <h1>test</h1>
        </div>
    )
}

export function Casts({id, name, img, character})
{
    return(
        <div className="detail-wrapper">
            <div className="detail-modal">
            <h1>{name}</h1>
            </div>
           
        </div>
    );
}


Casts.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.arrayOf(PropTypes.object).isRequired,
    img:  PropTypes.string.isRequired
}

export default Detail;


