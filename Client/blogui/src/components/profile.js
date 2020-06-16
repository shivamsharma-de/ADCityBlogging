import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./sidebar";
import Profileupdate from "../services/profileupdate"


const styleFooter = {
  position: "absolute",
  width: "100%"
}

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


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeaboutme = this.onChangeaboutme.bind(this);
    this.onChangewebsite = this.onChangewebsite.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      firstname: "",
      lastname: "",
      gender: "",
      username: "",
      email: "",
      city:"",
      aboutme:"",
      currentUser: AuthService.getCurrentUser(),
    };
  }

  
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeCity(e) {
    this.setState({
      city: e.target.value
    });
  }
  onChangeaboutme(e) {
    this.setState({
      aboutme: e.target.value
    });
  }
  onChangewebsite(e) {
    this.setState({
      website: e.target.value
    });
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
    
      });
    }
  }
  handleUpdate(e){
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    }); 

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      Profileupdate.update(
       this.state.email,
       this.state.city,
       this.state.aboutme,
       this.state.website
       
 
      ).then(
   
        response => {
          this.setState({
            message: response.data.message,
            successful: true
            
          });
          this.props.history.push("/")
          window.location.reload();
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
    const { currentUser } = this.state;

    return (
      <div>
      <div className="fixed-top">
      <Header/>
      </div>
     
        
        <div className="container mrgn">
          <div className="row">
          {currentUser ? (
            <>
            <div className="col-md-8">
          
            <div className="card">
            <Form onSubmit={this.handleUpdate}
            ref={c => {
              this.form = c;
            }}> 
            {!this.state.successful && (
              <div className="p-3">
                <div class="form-group">
                  <div class="row">
                    <div class="col-12">
                    <label for="exampleInputEmail1">First name</label>
                      <input
                        type="text"
                        disabled
                        class="form-control"
                        placeholder={currentUser.firstname}
                      />
                    </div>
                    <div class="col-12 mt-2 mb-2">
                    <label for="exampleInputEmail1">Last name</label>
                      <input
                        type="text"
                        disabled
                        class="form-control"
                        placeholder={currentUser.lastname}
                      />
                    </div>
                  </div>

                  <label for="exampleInputEmail1">Email address</label>
                  <Input 
                  class="form-control" 
                  id="title"
                  type="text-area"
                      className="form-control"
                      name="title"
                      placeholder={currentUser.email}
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                   rows="3"/>
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>


                <div class="form-group">
                  <label for="exampleFormControlFile1">
                    Where do you live
                  </label>
                  <Input 
                  class="form-control" 
                  id="title"
                  type="text-area"
                      className="form-control"
                      name="title"
                      placeholder={currentUser.city}
                      value={this.state.city}
                      onChange={this.onChangeCity}
                      validations={[required]}
                   rows="3"/>
                </div>

                <div class="form-group">
                  <label for="exampleFormControlFile1">
                   Tell us about yourself
                  </label>
                  <Input 
                  class="form-control" 
                  id="title"
                  type="text-area"
                      className="form-control"
                      name="title"
                      placeholder={currentUser.aboutme}
                      value={this.state.aboutme}
                      onChange={this.onChangeaboutme}
                      validations={[required]}
                   rows="3"/>
                </div>

                <div class="form-group">
                  <label for="exampleFormControlFile1">
                    your online handles
                  </label>
                  <Input 
                  class="form-control" 
                  id="title"
                  type="text-area"
                      className="form-control"
                      name="title"
                      placeholder={currentUser.website}
                      value={this.state.website}
                      onChange={this.onChangewebsite}
                      validations={[required]}
                   rows="3"/>
                </div>
                <div>
                  
                <button type="submit" class=" btn btn-outline-info">
                  Update
                </button>
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
                }}/>

              </Form>
              </div>
           
  
            </div>
            <div className="col-md-4">
            <Sidebar />
          
            </div>
            </>
            
            ): (
              
              <div className="col-md-12">
              <div class="card text-center">
              <div class="card-header">
                Ooops!! You are not Authorized.
              </div>
              <div class="card-body">
                <h5 class="card-title">You are not Logged In</h5>
                <p class="card-text">You have not logged in. Kindly Sign Up or Login to create a Post.</p>
                <a href="/login" class="btn btn-dark">Sign In</a>
              </div>
              <div class="card-footer text-muted">
              @MIA
              </div>
            </div>
            </div>
            
          
            )}
            
          
          </div>

        </div>
  
        <div style={styleFooter}>
          <Footer />
        </div>
      </div>
    );
  }
}
