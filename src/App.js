import React, { Component } from 'react';
import './styles/index.scss';
import axios from 'axios';
import _ from 'lodash';

import Header from "./components/Header";
// import List from "./components/List";
import Form from "./components/Form";
import Footer from "./components/Footer";

const apiKey = {headers: {'X-Api-Key': 'WmnJRPnNY03RQ5PsuPxaXaOgQ3mm8ZTQahg1XzjK'}};
const url = `https://m37ov7xhd3.execute-api.eu-west-1.amazonaws.com/default/ui_example_data_endpoint`;


class App extends Component {

  constructor(props) {
   super(props);

   this.state = {
     array: [],
     newUser: ""
   };

   this.renderPeople = this.renderPeople.bind(this);
 }

  componentDidMount() {
    axios.get(url, apiKey)
    .then(({ data })=> {
       this.setState(
         { array: data.body.people }
       );
       console.log(data);
     })
     .catch((err)=> {console.log('data error');})
  }

  renderPeople() {
    return _.map(this.state.array, user => {
      return (
        <p className="list-users-info" key={user.first_name, user.last_name, user.age, user.nationality, user.risk_percentage}>
            {user.first_name} {user.last_name} {user.age} {user.nationality} {user.risk_percentage}
        </p>
      );
    });
  }

  addUser = event => {
    event.preventDefault();
    this.setState(user => {
      console.log("data = " + user);
      return {
         array: [
           ...user.array,
           { first_name: user.newUser[0], last_name: user.newUser[1], age:user.newUser[2], nationality:user.newUser[3], completed: false }
         ],
        newUser: ""
      };
    });
  };

  handleInput = event => {
    this.setState({ newUser: event.target.value.split(' ')});
  };

  render() {
    console.log(this.state.array);
   return(
     <div className="App">

      <Header />

      <div className="wrapper">

        <h2> Users </h2>
        <div className="list-users">
          {this.renderPeople()}
        </div>

        <div>
          <form onSubmit={this.addUser}>
            <input
              type="text"
              onChange={this.handleInput}
              value={this.state.newUser}
              placeholder="Add a new task"
            />
            <button>Submit</button>
          </form>
        </div>

      </div>

      <Footer />

     </div>
   );
 }


}
export default App
