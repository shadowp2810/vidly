import http from "./httpService";

//We shouldent hardcode this url, the right place is a config file,
// but we are refractoring step by step.
export function getGenres() {
  return http.get("http://localhost:3900/api/genres");
}
