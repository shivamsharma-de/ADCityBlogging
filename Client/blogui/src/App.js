import React from 'react';

import './App.css';
import Home from './components/home'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignUp from './components/Signup';
import Login from './components/Login';

import Createpost from './components/CreatePost'
import Posts from './components/postspaginated';
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from './components/profile';
import SpecificPost from './components/specificpost';
import Userprofile from './components/userprofile';
import Admin from './components/admincomponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import Searchpage from './components/searchpagelanding'
import Searchpageuser from './components/saerchuser';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
     
      
      <Switch>
      <Route path="/" component={Home} exact />
      
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      
      <Route path="/create-post" component={Createpost}/>
      <Route path="/posts" component={Posts}/>
      <Route path="/singleposts/:id" component={(props) => <SpecificPost {...props} />}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/userprofile/:id" component={Userprofile}/>
      <Route path="/admin" component={Admin}/>
      <Route
      path="/search"
      component={(props) => <Searchpage {...props} />}
      />
            <Route
      path="/searchuser"
      component={(props) => <Searchpageuser {...props} />}
      />

  </Switch>
  </BrowserRouter>
    </div>
  );
}

export default App;
