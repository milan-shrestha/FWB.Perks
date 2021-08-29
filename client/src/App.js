import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ConnectWallet from "./pages/connectwallet"
import AirtableEmbed from './pages/airtableembed'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
   
  callBackendAPI = async () => {
    const response = await fetch('/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/memberperks">
            <AirtableEmbed />
          </Route>
          <Route path='/'>
            <ConnectWallet />
          </Route>
        </Switch>
      </Router>
      
    )
    /*return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.data}</p>
      </div>
    );*/
  }
}

export default App;