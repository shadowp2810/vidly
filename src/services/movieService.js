import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}
export function getMovie(movieID) {
  return http.get(apiEndpoint + "/" + movieID);
}
export function saveMovie(movie) {}

export function deleteMovie(movieID) {
  return http.delete(apiEndpoint + "/" + movieID);
}
