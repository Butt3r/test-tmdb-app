import React from 'react';
import PropTypes from 'prop-types';

function Movie({backPoster, title, overview, rate})
{
    return (
    <div className="movies-container">
        <img src={backPoster} alt={title} title={title}/>
        <div className="movie-data">
            <h2 className="title">{title}</h2>
            <h3 className='rate'>{rate / 2}</h3>
            <p className="overview">{overview}</p>
        </div>
    </div>
    );
    
}


Movie.propTypes = {
    id: PropTypes.number.isRequired,
    backPoster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    //poster: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    
};

export default Movie;