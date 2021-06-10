import React,  { Component }  from 'react';
import {Link} from 'react-router-dom'
// import { getGenres } from '../services/fakeGenreService';
import { getGenres } from '../services/genreService';
import { deleteMovie, getMovies } from '../services/movieService';
// import { deleteMovie, getMovie } from '../services/fakeMovieService'
import { paginate } from '../utils/paginate';
import Like from './common/like';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
import {toast} from 'react-toastify'

class Movies extends Component {
 
  state = {
    movies: [],
    genres: [],
    searchQuery: "",
    selectedGenre : null,
    pageSize: 4,
    currentPage: 1,
  };

  async componentDidMount(){
    const { data } = await getGenres();
    const genres = [{_id: "", name : "All Genres"}, ...data]

    const { data : movies } = await getMovies();

    this.setState( {genres , movies} );
  }

  async handleDelete(movie) {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter( m => m._id !== movie._id);
    this.setState({movies});

    try{
      await deleteMovie(movie._id);
    }
    catch (ex) {
      if(ex.response && ex.response.status === 404 )
      {
        toast.error("The Movie does not exists");
      }

      this.setState({ movies : originalMovies });
    }
  }

  handleLikeUnlike(movie) {
    //console.log("Like Clicked" , movie);

    const movies = [...this.state.movies]; //cloning the movies of state via spreading operator
    const index = movies.indexOf(movie); // finding the index of the movie that we want to change

    movies[index] = { ...movie }; // assigning a new object as it was pointint to state object. coz we dont change state object directly.
    movies[index].liked = !movies[index].liked; // changing the previous value
    //console.log(movies[index], this.state.movies[index]);
    this.setState({ movies }); //updating the state.
  }

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  handleSearch = (searchQuery) =>{
    this.setState({searchQuery, selectedGenre : null, currentPage : 1})
  }

  handleGenreSelect = (genre) => {
    console.log(genre);
    if(genre)
    this.setState({selectedGenre : genre, searchQuery : "", currentPage : 1})
    else 
    this.setState({selectedGenre : null, searchQuery : "", currentPage : 1})

  };

  render() {
    const { currentPage, pageSize, selectedGenre, searchQuery, movies: allMovies } = this.state; //object destructuring (state objects)


    let filteredMovies = allMovies;

    if(searchQuery){
    filteredMovies = allMovies.filter( m =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    }
    else if(selectedGenre && selectedGenre._id)
    filteredMovies = selectedGenre
      ? allMovies.filter(movie => movie.genre._id == selectedGenre._id)
      : allMovies;

    const movies = paginate(filteredMovies, currentPage, pageSize); // getting paginated  movies

    if (filteredMovies.length === 0)
      return <p>There are no movies in the database</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem = {this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="movieTable">
          <Link to="/movies/new" className="btn btn-primary">New Movie</Link>
          <br></br>
          <p>Showing {filteredMovies.length} in the database</p>
          
          <SearchBox value = {searchQuery} onChange = {this.handleSearch}/>

          {this.movies}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td><Link to={`/movies/${movie._id}`}>{movie.title}</Link></td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLikeUnlike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
 
export default Movies;