import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import { Casts }  from './Detail';
import { Video } from './Movie';
import config from '../api/config';

import './Home.css';
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



const baseUrl = config.API_ROOT;
const api_key = config.API_KEY;
const movieUrl = `${baseUrl}/movie`;
const nowPlaying = `${baseUrl}/movie/now_playing`;
const topRate = `${baseUrl}/movie/top_rated`;
const popular = `${baseUrl}/movie/popular`;

const arr = [nowPlaying, topRate, popular];

class Home extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
    isLoading: true,
    isCheck: false,
    isShow: false,
    update: 0,
    movies: [],
    videos: [],
    casts: [],
    max: 20,
    counter: 0,
  };
 
}


fetchNowPlaying = async () => {

    const{data} = await axios.get(arr[this.state.update], {
      params: {
          api_key: api_key,
          language: 'ko-KR'
      }
  });
  //console.log(data.results);
  this.setState({isLoading: false});
  
  let getId = data['results'].map((m) => {
    const id = m.id
    this.fetchMovieDetail(id);
    this.fetchVideo(id);
    this.fetchCasts(id);
  });
  return getId
  
}



fetchMovieDetail = async (id) => {
  const {data} = await axios.get(`${movieUrl}/${id}`, {
    params: {
      api_key: api_key,
      language: 'us-EN'
    }
  });

  this.state.movies.push(data);
  this.setState({isLoading: false});
  //console.log(data);
  
  //console.log(this.state.movies);
  return data;

}


fetchCasts = async (id) => {
  const {data} = await axios.get(`${movieUrl}/${id}/credits`, {
    params: {
      api_key: api_key,
    }
  });

  this.setState({isLoading: false});
  this.setState({isShow: false});
  this.state.casts.push(data['cast']['0'])
  //console.log(this.state.casts);
  return data;
  
}


fetchVideo = async (id) => {
  const {data} = await axios.get(`${movieUrl}/${id}/videos`, {
    params: {
      api_key: api_key,
    }
  });

 
  

  // 임시 
  this.state.videos.push(data['results'][0]);

  if(data['results'][0] === undefined){
    let idx = this.state.videos.indexOf(data['results'][0]);
    this.state.videos.pop(idx);
    this.state.videos.splice(idx, 0, {key: "2U76x2fD_tE"});
  }
  
    //this.state.movies.pop(idx)
    //this.state.counter--;
    //this.state.max--;

  
  this.setState({isCheck: false});
  this.setState({isLoading: false});
  
  
  return data;
}

renderCasts = () => {
  const results = this.state.casts.map((c, idx) => {
    //console.log(c.id);
    
    return <Casts
    key = {idx}
    id = {c.credit_id}
    name = {c.name}
    character = {c.character}
    img = {'https://image.tmdb.org/t/p/w200' + c.profile_path}
    />
  });
  return results[this.state.counter];
}


renderVideo = () => {
  const results = this.state.videos.map((m, idx) => {  


    return <Video
    key = {idx}
    mkey = {m.key}
    />
  });
  
  return results[this.state.counter];
}





counterHandler = () => {

  if(this.state.counter === this.state.max)
      {
        this.setState({counter: 0});
      } 
      else if(this.state.counter === -1)
      {
        this.setState({counter: this.state.max-1});
      }     
      console.log(this.state.counter);
      
}

  componentDidMount(){
    this.fetchNowPlaying();
    
  } 


  componentDidUpdate(){
    this.counterHandler();
  }


  

renderMovies = () => {
    const poster = config.API_IMAGE.default;
  const result= this.state.movies.map((m, idx) => {  


      return <Movie
      key = {idx}
      id = {m.id}
      backPoster = {poster + m.backdrop_path}
      title = {m.title}
      original = {m.original_title}
      poster =  {poster + m.poster_path}
      overview =  {m.overview}
      rate = {m.vote_average}
      date = {m.release_date}
      tagline = {m.tagline}
      runtime = {m.runtime}
      genres = {m.genres}
      status = {m.status}
      production = {m.production_countries}
      />
   })
   return result[this.state.counter];
  
  }
  

  renderPoster = () => {
    const poster = config.API_IMAGE.default;
    return this.state.movies.map(data => { 
    return (
      <div key = {data}>
        <img className = "fullScren" id="posterImg" src={poster + data.backdrop_path} />
        {/* <div className="movie-data" style = {{textAlign: "center", fontSize: 20}}>
        <div className="date" style = {{color: "#fff"}}>{data.release_date.slice(0, 4)}&ensp;&ensp;◦ <div className="geners">{data.genres.map((g, i) => <li className="gener-list" key={i}>{g.name}</li>)}</div></div>
        <h3 className="rate">{data.vote_average}<div className="score">/10</div></h3>
        <h1 className="title">{data.title}</h1>
        <div className="movie-des">
            <div className="original">{data.original_title}&ensp;|&ensp; {data.runtime}mins&ensp;|<div className="production">{data.production_countries['0'].name}</div></div> 
            </div>
        </div> */}
      </div>
    )
    });
}
  

  render(){
    const {isLoading} = this.state;
    const {isCheck} = this.state;
    const {isShow} = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 900,
      slidesToShow: 1,
      fade: false, 
      afterChange: current => this.setState({counter: current}),
      beforeChange: (current, next) => this.setState({counter: next}),
      className: "slider"
      //variableWidth: true
      //adaptiveHeight: true
    }
    return (
      <section className="container">


      <Slider {...settings}>
      {this.renderPoster()}
      {/* {this.renderVideo()} */}
      </Slider>
     
        {isLoading ? (<div id="loader">
          <img src = "https://data.whicdn.com/images/305380579/original.gif"  alt="load"></img>
        </div>) : ( 
        <div id="main-movies">
          <i className="play" style={{cursor: "pointer"}} onClick={() => this.setState({isCheck: true})}><img src="../../circled-play.png" /></i>
          <button className="des-btn" onClick={() => this.setState({isShow: true})}>VIEW MORE</button> 
      {this.renderMovies()}
      </div>)} 
    
    
      
      {isCheck ? ( <div id="main-video">
      {this.renderVideo()}
      <i className="close" style={{cursor: "pointer"}} onClick={() => this.setState({isCheck: false})}><img src="../../close50.png" /></i>
      </div>) : (<div></div>)}
     
      {isShow ? (<div id="main-detail">
      {this.renderCasts()}
      <i className="close" style={{cursor: "pointer", zIndex: "7"}} onClick={() => this.setState({isShow: false})}><img src="../../close50.png" /></i>
      </div>) : (<div></div>)}
      

      
       {/* <div id="arrow-container">
      <FontAwesomeIcon icon={faAngleRight} size= "2x" className= "arrowRight" style= {{zIndex: "1"}} onClick={() => this.setState({counter: this.state.counter + 1})}/>
      <FontAwesomeIcon icon={faAngleLeft} size= "2x" className= "arrowLeft" style= {{zIndex: "1"}} onClick={() => this.setState({counter: this.state.counter - 1})}/>
      </div> */}
      </section>
      
     
      
    )

      
}
}
export default Home;
