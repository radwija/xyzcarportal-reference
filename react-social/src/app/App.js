import React, { Component } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AddCar from '../car/save-car/AddCar'
import SearchCars from '../car/search-car/SearchCars'

import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false
        });
      }).catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.error("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Routes>
            <Route caseSensitive path="/" element={<Home />} />
            <Route caseSensitive path="/addcar" element={<AddCar />} />
            <Route
              path="/profile"
              element={this.state.authenticated ? <Profile data={this.state} /> : <Navigate
                to={{
                  pathname: '/login',
                }}
              />}
            />
            <Route path="/login" element={<Login authenticated={this.state.authenticated} />} />
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            <Route element={<NotFound />} />
            {/* <Route exact path="/viewCar/:cid" element={<ViewCar />} /> */}
            <Route exact path="/search/by/:filter/q/:q" element={<SearchCars />} />
            <Route exact path="/search/by/:filter/min/:min" element={<SearchCars />} />
            <Route exact path="/search/by/:filter/max/:max" element={<SearchCars />} />
            <Route exact path="/search/by/:filter/min/:min/max/:max" element={<SearchCars />} />
          </Routes>
        </div>
        <Alert stack={{ limit: 3 }}
          timeout={3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export default App;
