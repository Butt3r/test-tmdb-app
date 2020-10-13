import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import config from '../api/config';

const baseUrl = config.API_ROOT;
const api_key = config.API_KEY;
const nowPlaying = `${baseUrl}/movie/now_playing`;
//const topRate = `${baseUrl}/movie/top_rated`;
//const movieId = `${baseUrl}/movie/movieID`;

class Home extends React.Component
{
  state = {
    isLoading: true,
    movies: []
  };
fetchNowPlaying = async () => {
    const {data} = await axios.get(nowPlaying, {
      params: {
          api_key: api_key,
          language: 'kr_KR',
          page: 1
      }
  })
  console.log(data);
  this.setState({movies: data, isLoading: false});
}

  componentDidMount(){
    this.fetchNowPlaying();
  }

  renderMovies = () => {
    const poster = config.API_IMAGE.default;
    const results = this.state.movies['results'].map(m => {            
      return <Movie
      key = {m.id}
      id = {m.id}
      backPoster = {poster + m.backdrop_path}
      title = {m.title}
      poster =  {poster + m.poster_path}
      overview =  {m.overview}
      rate = {m.vote_average}
      />
    })
    return results
  }

  render(){
    const {isLoading} = this.state;
    return <section className="container">hello
      {isLoading ? (
        <div id="loader">
          <img src = "https://data.whicdn.com/images/305380579/original.gif"  alt="load"></img>
        </div>
      ) : (
      <div className="movies">
        {this.renderMovies()}
      </div>

      )}
      </section>
}
}
export default Home;
