import "./index.css";

import * as serviceWorker from "./serviceWorker";

import App from "./App";
import Pusher from "pusher";
import { PusherProvider } from "./use-pusher";
import React from "react";
import ReactDOM from "react-dom";

const pusher = new Pusher({
  appId: process.env.REACT_APP_PUSHER_APP_ID,
  key: process.env.REACT_APP_PUSHER_KEY,
  secret: process.env.REACT_APP_PUSHER_SECRET,
  cluster: process.env.REACT_APP_PUSHER_CLUSTER
});

ReactDOM.render(
  <PusherProvider
    clientKey={process.env.REACT_APP_PUSHER_KEY}
    cluster="ap4"
    authorizer={({ name }) => ({
      authorize: async (socketId, callback) => {
        const auth = pusher.authenticate(socketId, name, {
          user_id: Math.random() * 124234,
          user_info: {}
        });
        callback(false, auth);
      }
    })}
  >
    <App />
  </PusherProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
