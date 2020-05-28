import React, { Component } from "react";
import {

  Link
} from "react-router-dom";
// import Signup from "./Signup";
// import Admin from './admincomponent';

import AuthService from "../services/auth.service";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
     
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
       
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <div className="">
        <nav className="navbar navbar-expand-lg navbar  navbar-dark bg-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand font-weight-bold" to="/">
              MIA
            </Link>
      
            
            {showAdminBoard && (
              
                <Link to={"/admin"} className="nav-link">
                <button
                className="btn btn-outline-light mr-2"
                type="submit"
                
              >
                Admin
              </button>
                </Link>
           
            )}
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/posts"} className="nav-link">
                    <button
                      className="btn btn-outline-light mr-2"
                      type="submit"
                    >
                      Blog
                    </button>
                  </Link>
                </li>
                <li className="nav-item nav-link dropdown">
               
                  <button
                    className=" btn btn-outline-light mr-2  dropdown-toggle"
                    type="submit"
                    
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                  
                    Profile 
                  </button>
   
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link
                      to={`/userprofile/${currentUser.id}`}
                      className="dropdown-item"
                    >
                      My profile
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link to={"/profile"} className="dropdown-item">
                      Profile Update
                    </Link>
                  </div>
                </li>
   
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    <button
                      className="btn btn-outline-light mr-2"
                      type="submit"
                      onClick={this.logOut}
                    >
                      Sign Out
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/create-post"} className="nav-link">
                    <button
                      className="btn btn-outline-light mr-2"
                      type="submit"
                    >
                      Create Post
                    </button>
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    <button
                      className="btn btn-outline-light mr-2"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/signup"} className="nav-link">
                    <button
                      className="btn btn-outline-light mr-1"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </Link>
                </li>
              </div>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
