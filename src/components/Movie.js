import React from 'react';
import './Movie.css';
import PropTypes from 'prop-types';


function Movie({idx, backPoster, title, poster, overview, rate})
{
    return (
    <div key={idx}>
    <div className="home-container">
        <img className = "fullScren" src={backPoster} alt={title} title={title}/>
    </div>
    <div className="nowplaying-data" style = {{textAlign: "center", fontSize: 20}}>
            <h2 className="title" style = {{color: "#fff"}}>{title}</h2>
            <h3 className='rate' style = {{color: "#fff"}}>{rate/2}</h3>
        </div>
    </div>
    );
    
}


Movie.propTypes = {
    id: PropTypes.number.isRequired,
    backPoster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    
};

export default Movie;