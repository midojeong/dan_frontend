import React, { Component } from 'react';
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import {
  theme, Layout,
} from "./components";
import { CoursePage } from "./pages/Course";
import { StudentPage } from "./pages/Student";
import { TeacherPage } from "./pages/Teacher";
import { InvoicePage } from "./pages/Invoice";


class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Route path="/" render={(props) =>
            <Layout {...props}>
              <Route path="/course" component={CoursePage} />
              <Route path="/student" component={StudentPage} />
              <Route path="/teacher" component={TeacherPage} />
              <Route path="/invoice" component={InvoicePage} />
            </Layout>
          } />
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
