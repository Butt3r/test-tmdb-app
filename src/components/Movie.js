import React from 'react';
import PropTypes from 'prop-types';
import config from '../api/config';


import './Movie.css';
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const baseUrl = config.API_ROOT;
const api_key = config.API_KEY;
const movieUrl = `${baseUrl}/movie/`;
const youtube = 'https://www.youtube.com/watch?v=';
const vimeo = 'https://vimeo.com/';


function Movie({id, title, backPoster, original, poster, overview, rate, date})
{


    return (
    <div >
        <img className="logo" src={"https://i.pinimg.com/originals/9b/3f/9c/9b3f9c24d9fd5f297ae433eb33d93514.png"} alt="logo"  width="150" height="60"/>
    <div className="home-container">
        <img className = "fullScren" src={backPoster} alt={title} title={title}/>
        <div className="box"></div>
        <div className="binet-box"></div>
    </div>
    <div className="nowplaying-data" style = {{textAlign: "center", fontSize: 20}}>
            <h1 className="title" style = {{color: "#fff"}}>{title}</h1>
            <div className="original">{original}
            <p className="date" style = {{color: "#fff"}}>{date.slice(0, 4)}</p></div>
            {/* <p className="overview" style = {{color: "#fff"}}>{overview}</p> */}
            <h3 className="rate">{rate}</h3>
        </div>
        {/* <h1>{id}</h1> */}
        {/* <FontAwesomeIcon icon={faPlayCircle} size= "10x" className="play" onClick = {PlayTrailer}/> */}
    </div>
    );
}

export function Video({mkey})
{

    return(
    <div>
        <div className="video-container">
            {/* <video id="video">
                <source src={`${youtube}${mkey}`} type="video/mp4" />
            </video> */}
        {/* <vidio src={`${youtube}${mkey}`} onClick = {this.play()}/> */}
    <i className="play" onClick={() => window.open(`${youtube}${mkey}`)}><img src="../../circled-play.png" /></i>
    </div>
    </div>
    );
}

// export const playTrailer = (e) => {
//     e.preventDefault();
//     var vid = document.getElementById("video");
//     vid.play();
// }


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
    date: PropTypes.string.isRequired
};

export default Movie;