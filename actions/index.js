import { REQUEST_COMPLETE, REQUEST_FAILURE } from "../constants";
const endpoint = "https://ituneslistenerapi20180912032938.azurewebsites.net/"; //

function success(data) {
  return {
    type: REQUEST_COMPLETE,
    data
  };
}

function failure(exception) {
  return {
    type: REQUEST_FAILURE,
    exception
  };
}

export function fetchMusic() {
  return function(dispatch) {
    const resource = "api/music";
    return fetch(`${endpoint}${resource}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        return dispatch(success(json));
      })
      .catch(error => {
        return dispatch(failure(error));
      });
  };
}

export function setCommand(command) {
  return function(dispatch) {
    const resource = "api/music/command";
    return fetch(`${endpoint}${resource}`, {
      method: "POST",
      body: JSON.stringify({
        command: command
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(error => dispatch(failure(error)));
  };
}
