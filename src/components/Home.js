import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import { Video } from './Movie';
import config from '../api/config';

import './Home.css';
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const baseUrl = config.API_ROOT;
const api_key = config.API_KEY;
const nowPlaying = `${baseUrl}/movie/now_playing`;
const movieUrl = `${baseUrl}/movie`;

//const topRate = `${baseUrl}/movie/top_rated`;


class Home extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
    isLoading: true,
    movies: [],
    videos: [],
    counter: 19
  };
}



fetchNowPlaying = async () => {

    const{data} = await axios.get(nowPlaying, {
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
  });
  return getId
  
}



fetchMovieDetail = async (id) => {
  const {data} = await axios.get(`${movieUrl}/${id}`, {
    params: {
      api_key: api_key,
      language: 'ko-KR'
    }
  });

  this.state.movies.push(data);
  this.setState({isLoading: false});
  //console.log(data);
  return data;

}


fetchVideo = async (id) => {
  const {data} = await axios.get(`${movieUrl}/${id}/videos`, {
    params: {
      api_key: api_key,
    }
  });
  this.state.videos.push(data['results'][0]);
  this.setState({isLoading: false});
  //console.log(this.state.videos);
  
  return data;
}


renderVideo = () => {
 
  //console.log(this.state.videos);
  const results = this.state.videos.map((m, idx) => {  

    return <Video
    key = {idx}
    id = {m.id}
    name = {m.name}
    mkey = {m.key}
    type = {m.type}
    />
  });
  
  return results[this.state.counter];
}



counterHandler = () => {

  if(this.state.counter === 20)
      {
        this.setState({counter: 0});
      } 
      else if(this.state.counter === -1)
      {
        this.setState({counter: 19});
      }     
      //console.log(this.state.counter);
      
}
  

  componentDidMount(){
    this.fetchNowPlaying();
  } 


  componentDidUpdate(){
    this.counterHandler();
  }


  renderMovies = () => {
    const poster = config.API_IMAGE.default;
    const results = this.state.movies.map((m, idx) => {  

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
      />
   })
   //console.log(results[this.state.counter]);
   return results[this.state.counter];
  
   
  }

  

  render(){
    const {isLoading} = this.state;
    return <section className="container">

        {isLoading ? (<div id="loader">
          <img src = "https://data.whicdn.com/images/305380579/original.gif"  alt="load"></img>
        </div>) : ( <div id="main-movies">
      {this.renderMovies()}
      </div>) } 

      <div id="main-video">
        {this.renderVideo()}
      </div>
      

      <FontAwesomeIcon icon={faAngleRight} size= "2x" className= "arrowRight" style= {{zIndex: "2"}} onClick={() => this.setState({counter: this.state.counter + 1})}/>
      <FontAwesomeIcon icon={faAngleLeft} size= "2x" className= "arrowLeft" style= {{zIndex: "2"}} onClick={() => this.setState({counter: this.state.counter - 1})}/>
      </section>
}
}
export default Home;
