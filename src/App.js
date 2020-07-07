import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import { Navbar, Cards, CountryPicker } from "./components";
import { fetchDate, fetchLocalCountry } from "./api";
class App extends Component {
  state = { data: {}, localData: {}, country: "India" };

  async componentDidMount() {
    try {
      const data = await fetchDate();
      const localData = await fetchLocalCountry();
      this.setState({ data, localData });
    } catch (err) {
      console.log(err);
    }
  }
  handleCountryChange = async countryName => {
    const localData = await fetchLocalCountry(countryName);
    const { country } = localData;
    this.setState({ localData, country });
  };
  render() {
    const { data, localData, country } = this.state;
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Navbar font="font-bd" link="/" />
                  <Cards data={data} />
                  <div className="container">
                    <CountryPicker
                      country={country}
                      localData={localData}
                      handleCountryChange={this.handleCountryChange}
                    />
                  </div>
                </Fragment>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
