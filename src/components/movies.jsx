import React,  { Component }  from 'react';
import { deleteMovie, getMovies } from '../services/fakeMovieService'

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
                        </tr>
                    </thead>
                    <tbody>
                       {this.state.movies.map(movie =>   
                       <tr key={movie._id}>
                           <td>{movie.title}</td>
                           <td>{movie.genre.name}</td>
                           <td>{movie.numberInStock}</td>
                           <td>{movie.dailyRentalRate}</td>
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