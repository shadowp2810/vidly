function init() {}

function log(error) {
  console.error(error);
}

//This is the interface of our logging service and had two methods init and log
export default {
  init,
  log,
};
