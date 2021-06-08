import http from './httpService'

const apiEndpoint = "http://localhost:3900/api/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(apiEndpoint + "/" + id)
}

export function deleteMovie(movieId){
  console.log(movieId);
  return http.delete(apiEndpoint + "/" + movieId)
}

export async function saveMovie(movie) {

  if(movie._id){
    const movieBody = { ...movie };
    delete movieBody._id
    const { data } = await http.put(apiEndpoint + "/" + movie._id, movieBody);
  }
 else{
  const { data } = await http.post(apiEndpoint, movie);
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

  
