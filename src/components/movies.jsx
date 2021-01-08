import React,  { Component }  from 'react';
import { deleteMovie, getMovies } from '../services/fakeMovieService'
import Like from './common/like';

class Movies extends Component {
    state = { 
        movies : getMovies()
     };

     handleDelete(movie){
         deleteMovie(movie._id)

         this.setState({ movies: getMovies() })
         console.log("delete button clicked", movie._id)
         console.log(this)
     }

     handleLikeUnlike (movie) {
        //console.log("Like Clicked" , movie);

        const movies = [...this.state.movies]; //cloning the movies of state via spreading operator
        const index = movies.indexOf(movie); // finding the index of the movie that we want to change

        movies[index] = {...movie} // assigning a new object as it was pointint to state object. coz we dont change state object directly. 
        movies[index].liked = !movies[index].liked; // changing the previous value
        //console.log(movies[index], this.state.movies[index]);
        this.setState({movies}); //updating the state.
     }
     

    render() { 
        if(this.state.movies.length === 0) return <p>There are no movies in the database</p>

        return ( 
            <React.Fragment>
                <p>Showing {this.state.movies.length} in the database</p>

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
                       {this.state.movies.map(movie =>   
                       <tr key={movie._id}>
                           <td>{movie.title}</td>
                           <td>{movie.genre.name}</td>
                           <td>{movie.numberInStock}</td>
                           <td>{movie.dailyRentalRate}</td>
                           <td><Like liked = {movie.liked} onClick = {() => this.handleLikeUnlike(movie)}/></td>
                           <td><button onClick={ () =>this.handleDelete(movie) } className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                        )}
                    </tbody>
                    </table>
            </React.Fragment>
         );
    }
}
 
export default Movies;