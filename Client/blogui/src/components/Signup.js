import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Header from "./Header";
import Footer from "./Footer";
import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};




class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);

    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      gender: "",
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }
  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }
  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });


   
    
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.firstname,
        this.state.lastname,
        this.state.gender,
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }
  render() {
    return (
      <div>
      <div className="fixed-top">
      <Header/>
      </div>
       
          <Form onSubmit={this.handleRegister}
          ref={c => {
            this.form = c;
          }}>
          {!this.state.successful && (
            <div
            className=" container col-md-4 col-md-offset-4"
            style={{ padding: "30px" }}
          >            <div className="form-row">
             
          <div className=" col-md-6 mb-3">
                  <label htmlFor="firstname">Firstname</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={this.state.firstname}
                    onChange={this.onChangeFirstname}
                    validations={[required]}
                  />
                  </div>
                
             
               
                <div className="col-md-6 mb-3">
                <label htmlFor="lastname">Lastname</label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Lastname"
                  value={this.state.lastname}
                  onChange={this.onChangeLastname}
                  validations={[required]}
                />
                </div>
              </div>
            
          
              <div className="row">
              <div className=" col-md-12 mb-3">
                <label htmlFor="inputEmail43">Email</label>
                <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required, email]}
              />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              </div>
         
            <div className="row">
  <div className="col-auto mb-3">
                <label htmlFor="username">Username</label>
                <div className="input-group mb-2 ">
                  <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                  </div>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                </div>
            

            
              <div className="col-md-5 mb-3">
              <label htmlFor="username">Gender</label>
              <Input
              type="text"
              className="form-control"
              placeholder="Gender"
              value={this.state.gender}
              onChange={this.onChangeGender}
              validations={[required]}
            />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="password">Password</label>
                <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required, vpassword]}
              />
              </div>
            </div>
            <div className="row">
            <div className="col-md-12 mb-3">
            <button type="submit" className="btn btn-dark font-weight-bold">
              Sign Up
            </button>
            </div>
            </div>
            <div className = "row" style={{paddingTop:"1cm"}}>
            <div className = "col-md-12 mb-3">
            <p className="text-muted">
                Alreday have an account <Link to="/login" className="text-reset">Login</Link>.
             </p>
             </div>
             </div>
             </div>
          )}
          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={c => {
              this.checkBtn = c;
            }}
          />
          </Form>
      
        <Footer />
      </div>
    );
  }
}

export default Signup;
