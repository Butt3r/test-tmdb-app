import React from 'react';
import PropTypes from 'prop-types';
import config from '../api/config';
import ReactPlayer from 'react-player';


import './Movie.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"


const baseUrl = config.API_ROOT;
const movieUrl = `${baseUrl}/movie/`;
const youtube = 'https://www.youtube.com/watch?v=';
const vimeo = 'https://vimeo.com/';


function Movie({id, title, backPoster, original, poster, overview, rate, date, tagline, runtime, genres, status, production})
{
    return (
    <div className="container">
        <img className="logo" src={"https://i.pinimg.com/originals/9b/3f/9c/9b3f9c24d9fd5f297ae433eb33d93514.png"} alt="logo"  width="150" height="60"/>
    <div className="home-container">
        {/* <img className = "fullScren" id="posterImg" src={backPoster} /> */}
        <div className="box"></div> 
        <div className="binet-box"></div>
    </div>

    
    <div className="movie-data" >
        <div className="date" style = {{color: "#fff"}}>{date.slice(0, 4)}&ensp;&ensp;◦ <div className="geners">{genres.map((g, i) => <li className="gener-list" key={i}>{g.name}</li>)}</div></div>
            <h3 className="rate">{rate}<div className="score">/10</div></h3>
            <h1 className="title">{title}</h1>
            <div className="movie-des">
            <div className="info">{original}&ensp;|&ensp; {runtime}mins&ensp;|<div className="production">{production.slice(0,1).map((p, i) => <p key={i}>{p.name}</p>)}</div></div>
            </div>
            <div className="overview">{overview}</div>
            </div>
           
    </div>
    
    );
    
}

export function Video({mkey})
{

    return(
    <div className="player-wrapper">
         <div className="modal"/>
            <ReactPlayer
                className="react-player"
                url={`${youtube}${mkey}`}
                playing
                width= "90%"
                height= "90%" 
                controls
                volume=	"0.500"
        />
    </div>
    );
}


Video.propTypes = {
    mkey: PropTypes.string.isRequired
    
};

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    backPoster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    original: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    runtime: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
    status: PropTypes.string.isRequired,
    production: PropTypes.arrayOf(PropTypes.object).isRequired

};

export default Movie;