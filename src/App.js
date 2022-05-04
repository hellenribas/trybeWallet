import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Table from './pages/Table';
import Wallet from './pages/Wallet';

class App extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      idTarget: '',
    };
  }

  receiveEdit = (idTarget) => {
    console.log(idTarget);
    this.setState({
      edit: true,
      idTarget,
    });
  }

  receiveEditOff = () => {
    this.setState({ edit: false });
  }

  render() {
    const { edit, idTarget } = this.state;
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          exact
          path="/carteira"
          render={ () => (<Wallet
            edit={ edit }
            idTarget={ idTarget }
            receiveEditOff={ this.receiveEditOff }
          />) }
        />
        <Route
          exact
          path="/despesas"
          render={
            () => (<Table
              receiveEdit={ this.receiveEdit }
            />)
          }
        />
        {/* <Table receiveEdit={ this.receiveEdit } /> */}
      </Switch>
    );
  }
}

export default App;
