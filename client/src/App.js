import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import './App.css';
import AppNavbar from './components/AppNavbar.js';
import ShoppingList from './components/ShoppingList.js'

class App extends Component {
  render() {
    return (
      <div className="App">
          <AppNavbar/>
          <Container>
            <div className='text-center'>
              <h1>Here's a list of some of my favorite things.</h1>
              <h3>Add one of your favorite things, too! :)</h3>
            </div>
            <ShoppingList/>
          </Container>
      </div>
    )
  }
}


export default App;
