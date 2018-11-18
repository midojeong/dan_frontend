import React, { Component } from 'react';
import { ThemeProvider } from "styled-components";
import {
  theme, Text
} from "./components";


class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Text color="black.half">asdajop</Text>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
