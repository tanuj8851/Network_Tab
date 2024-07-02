import React from "react";
import axios from "axios";
import NetworkTab from "./components/NetworkTab";
import {
  requestInterceptor,
  responseInterceptor,
} from "./components/interceptors";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(responseInterceptor);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <CssBaseline />
        <NetworkTab />
      </div>
    </ThemeProvider>
  );
};

export default App;
