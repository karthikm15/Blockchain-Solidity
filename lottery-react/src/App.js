import React, {Component} from 'react';
import web3 from './web3';
import logo from './logo.svg';
import './App.css';
import lottery from './lottery';

class App extends Component {
  // Traditional format - just creating state so can condense
  // constructor (props) {
  //   super(props);

  //   this.state = {manager: ''};
  // }

  // Condensed form
  state = {
    manager: '',
    players: [],
    // Balance not a number but an object wrapped in .js library
    balance: '',
    value: '',
    message: '',
    lastWinner: ''
  };

  // didMount component will be called after rendered on screen - great for data loading
  // Initial method will show '' for manager - but then will render and see the manager state.
  async componentDidMount() {
    // When using provider from Metamask, do not need to specify provider because already default provider
    // Do not need to put {from : accounts[0]} inside call()
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    
    // set the state to manager
    this.setState ({manager, players, balance});
  }

  // This function will be called if the button is pressed for "enter"
  // Using this arrow notation, you do not need to worry about the .this notation
  onSubmit = async (event) => {
    // Want to make sure that the form does not submit itself in the default way
    event.preventDefault()

    // For sending transaction, have to retrieve list of accounts and index
    // For everything else, this is not necessary
    // Takes 15-20 seconds so want to give a message to user so that we can communicate with the delay
    const accounts = await web3.eth.getAccounts()

    this.setState({message: 'Waiting on transaction success...'});
    
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })

    this.setState({message: 'You have been entered!'});
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});
    
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const lastWinner = await lottery.methods.getLastWinner().call({ from: accounts[0]});
    this.setState({message: 'A winner has been picked!'});

    this.setState({message: lastWinner});
  }
  

  render(){
    // Gets accounts from Metamask and prints it out on the console
    // web3.eth.getAccounts().then(console.log);
    
    // can use the fromWei() command to convert from wei to ether
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value = {this.state.value}
              onChange={event => this.setState({value: event.target.value})}
            />
          </div>
          <button>
            Enter
          </button>
        </form>

        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <hr />

        <h1>{this.state.message}
        
        </h1>
      </div>
    );
  }
}

export default App;
