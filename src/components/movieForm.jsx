import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService'

class MovieForm extends Form {
    state = { 
        data : {
            title:"",
            genreId: "",
            numberInStock:"",
            dailyRentalRate:""
        },
        genres: [],
        errors : {}
     }

     schema = {
         _id : Joi.string(),
         title : Joi.string().required().label("Title"),
         genreId : Joi.string().required().label("Genre"),
         numberInStock : Joi.number().required().min(0).label("Number in stock"),
         dailyRentalRate : Joi.number().required().max(10).label("Rate")
     }

     async componentDidMount(){
        this.populateGenre();
        this.populateMovie();       
    }

     async populateGenre(){
        const { data :genres } = await getGenres();
        this.setState( {genres} );
     };

     async populateMovie() {
        const movieId  = this.props.match.params.id;
        if(movieId === "new") 
            return;

        try {
        const { data : movie } = await getMovie(movieId);
        this.setState ({ data : this.mapToViewModel(movie) });
        }
        catch (ex) {
            if(ex.response && ex.response.status === 404)
            this.props.history.replace("/not-found");
        }
     }

     mapToViewModel(movie){
        return {
            _id: movie._id,
            title : movie.title,
            genreId : movie.genre._id,
            numberInStock : movie.numberInStock,
            dailyRentalRate : movie.dailyRentalRate
        }
    }
      
    doSubmit = async () => {
         await saveMovie(this.state.data);
         this.props.history.push("/movies");
     }

    render() { 
        return ( 
            <div>
                {this.props.match.params.id === "new" ? (<h1>New Movie</h1>) : (<h1>Edit Movie</h1>) }
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number In Stock", "number")}
                    {this.renderInput("dailyRentalRate", "Rate", "number")}
                    {this.renderButton("Save")}
                </form>
            </div>
         );
    }
}
 
export default MovieForm;
 