import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}
export function getMovie(movieID) {
  return http.get(apiEndpoint + "/" + movieID);
}
export function saveMovie(movie) {
  //update existing movie
  if (movie._id) {
    //we dont want to directly modify movie so we clone it.
    const body = { ...movie };
    delete body._id;
    return http.put(apiEndpoint + "/" + movie._id, body);
  }
  //create new movie
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieID) {
  return http.delete(apiEndpoint + "/" + movieID);
}
