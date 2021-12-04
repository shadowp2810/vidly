import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    //get id parameter from route
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    //if id is not new we get movie with given id
    const movie = getMovie(movieId);
    /*
    if movie doesn't exist we redirect user to not-found
    We dont use history.push because when user clicks back button 
    they would return with an invalid movie id 
    and again redirected to no-found page, 
    so they will end up in infinite loop. 
    The back button will never take them back to where they used to be. 
    */
    if (!movie) return this.props.history.replace("/not-found");

    /*
    We are setting the data property, 
    but we are not setting that to the movie object we get from server.
    This is a typical real world scenario,
    because the restful apis we have on server are general purpose.
    They are not built for specific page.
    So data they return is used on several pages.
    Each page needs a piece of that data.
    Also what we want to display on page 
    is a little bit different from structure of data.
    */
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.titile,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    //We save the movie and redirect to /movies
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
