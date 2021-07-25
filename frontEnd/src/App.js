import { Route, Switch } from 'react-router-dom';
import Register from './register&login/JSX/Register.js';
import Login from './register&login/JSX/Login.js';
import Nav from './main/JSX/Nav.js';
import NotFound from './NotFound.js';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <div className="parent">
        <div className="bodyContainer">
          <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/nav" component={Nav} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
