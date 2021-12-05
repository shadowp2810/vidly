import Raven from "raven-js";

function init() {
  Raven.config('https://05323d37c9a947eba%daaaable6171a9@sentry.io/1249956"', {
    release: "0-0-0",
    environment: "development-test",
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

//So this is the interface of our logging service and had two methods init and log
export default {
  init,
  log,
};
