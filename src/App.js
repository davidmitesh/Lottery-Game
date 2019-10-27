import React, { Component } from "react";
import logo from "./logo.svg";
import web3 from "./web3.js";
import lottery from "./lottery";
import { Header } from 'semantic-ui-react'
import "./App.css";
// import Layout from "../components/layout.js";
const HeaderExampleBlock = () => (
<div>
<Header as='h4'  color='red' >
  Block Header
</Header>
</div>

)
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { Manager: "" };
  // }
  state = {
    Manager: "",
    Players: [],
    balance: "",
    value: "",
    message: ""
  }; //This is equivalent to above construction declaration.It is a ES6 syntax.

  async componentDidMount() {
    //This is called only one time when app component is
    //placed  first   on screen.

    const Manager = await lottery.methods.Manager().call();
    //whenever we are using the provider of the metamask we dont need to
    //specify the from: field.
    const Players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ Manager, Players, balance });
  }
  onSubmit = async event => {
    //one of the benefits of using arrow function is that we don't
    //need to define the this keyword inside here.
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({
      message:
        "Waiting on transaction success.....(This may take from several seconds to minutes.Please be patient!)"
    });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({ message: "You have been entered in the lottery" });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({
      message:
        "Waiting on transaction success.....(This may take from several seconds to minutes.Please be patient!)"
    });
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: "Winner has been picked!!" });
  };
  render() {
    web3.eth.getAccounts().then(console.log); //this initially won't work in
    //browser because in order to protect the privacy of the account holder,
    //metamask will not directly inject the accounts directly to the browser.
    //So, we need to do a request as window.ethereum.enable(). And approve yes.
    return (
      <div>
          <head >
              <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
          </head>
        <h2 class="ui red header">Lottery Game!</h2>
        <p>
          This contract is managed by : {this.state.Manager}. There are
          currently {this.state.Players.length} people entered, competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether.
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter:</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>
            <h4>Enter!</h4>
          </button>
        </form>
        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
