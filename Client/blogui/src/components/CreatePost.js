import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import AuthService from "../services/auth.service";
import PostService from '../services/post.service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export class Createpost extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);

    this.state = {
      title: "",
      content: "", 
      currentUser: undefined,
      successful: false,
      message: ""
    };
  } 
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value
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
  handleSubmit(e){
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    }); 

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      PostService.createpost(
        this.state.title,
        this.state.content,
       
 
      ).then(
   
        response => {
          this.setState({
            message: response.data.message,
            successful: true
            
          });
          this.props.history.push("/posts")
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
      const { currentUser} = this.state;

        return (
           <div>
           <div className="fixed-top">
           <Header/>
           </div>
            
            {currentUser ? (
              
           
            <div className=" container col-md-6 col-md-offset-4" style={{padding:"30px"}}>
            <Form onSubmit={this.handleSubmit}
            ref={c => {
              this.form = c;
            }}> 
            {!this.state.successful && (
              <div>
            <div class="form-group">
            <label htmlFor="title">Post Title</label>
            <Input 
            class="form-control" 
            id="title"
            type="text-area"
                className="form-control"
                name="title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                validations={[required]}
             rows="3"/>
           </div>
            <div class="form-group">
            <label htmlFor="content">Post Description</label>
            <Textarea 
            class="form-control" 
            id="exampleFormControlTextarea1"
            type="textarea"
                className="form-control"
                name="content"
                value={this.state.content}
                onChange={this.onChangeContent}
                validations={[required]}
             rows="3"/>
          </div>
          <div>
            <button class="btn btn-secondary font-weight-bold" type="submit">Submit Post</button>
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
          </div>
            ): (
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

            )}
          
     <div className="fixed-bottom">
      <Footer/>
      </div>
      </div>  
           
        )
    }
}

export default Createpost
