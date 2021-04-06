import Rollbar from 'rollbar';

export const rollbar = new Rollbar({
  accessToken: '9912db541f8c42d88dc9a147d49062ef',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.VUE_APP_ROLLBAR
  }
});
