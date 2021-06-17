import http from './httpService'

const apiEndpoint = "http://localhost:3900/api/movies";

function movieUrl(movieId){
  return `${apiEndpoint}/${movieId}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id))
}

export function deleteMovie(movieId){
  return http.delete(movieUrl(movieId))
}

export async function saveMovie(movie) {

  if(movie._id){
    const movieBody = { ...movie };
    delete movieBody._id
    return http.put(movieUrl(movie._id), movieBody);
  }
 else{
  return http.post(apiEndpoint, movie);
 }
  
  // let movieInDb = movies.find(m => m._id === movie._id) || {};
  // movieInDb.title = movie.title;
  // movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  // movieInDb.numberInStock = movie.numberInStock;
  // movieInDb.dailyRentalRate = movie.dailyRentalRate;

  // if (!movieInDb._id) {
  //   movieInDb._id = Date.now().toString();
  //   movies.push(movieInDb);
  // }
}

  
