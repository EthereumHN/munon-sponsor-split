import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { theme, ThemeProvider } from "rimble-ui";

const myTheme = {
  ...theme,
  colors: {
    primary: "#dc3545",
    black: "#3f3d4b",
    white: "#fff",
    blue: "#007ce0",
    navy: "#004175",
    secondary: "#dc3545"
  }
};
ReactDOM.render(
  <ThemeProvider theme={myTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
