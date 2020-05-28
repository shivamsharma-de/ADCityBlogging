import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Moment from "react-moment";
import Sidebar from "./sidebar";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from 'axios';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export class SpecificPost extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handledelete = this.handledelete.bind(this);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.state = {
      post: {},
      title:"",
      content:"",
      currentUser: AuthService.getCurrentUser(),
      message:""
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
    this.loadPage();
    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
    
      });
    }
  }

  loadPage() {
    const id = this.props.match.params;
    console.log(id);
    fetch(`http://localhost:5000/api/test/posts/${id.id}`, { method: "GET" })
      .then((response) => response.json())
      .then((post) => {
        this.setState(() => ({ post }));
      });
  }
  updatepost(title, content){
    // const user = AuthService.getCurrentUser();
    const id = this.props.match.params;
    
    
    return axios.put( `http://localhost:5000/api/test/updatepost/${id.id}`,{
       title,
       content

      });
      
}

handledelete(e){
  e.preventDefault();
  // this.setState({
  //   message: "",
  //   successful: true
  // }); 
    const id = this.props.match.params;

       axios.delete( `http://localhost:5000/api/test/deletepost/${id.id}`,{
     
     
    });
    
  
  this.props.history.push("/posts") 
  window.location.reload();
}
 
  handleUpdate(e){
    e.preventDefault();
    this.setState({
      message: "",
      successful: false
    }); 

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.updatepost(
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
    const { currentUser } = this.state;
    console.log(currentUser);
    const { post } = this.state;
 
    
   
 console.log(currentUser);
    return (
      <div>
      <div className="fixed-top">
      <Header/>
      </div>

        <div className="container">
          <div className="row">
          {currentUser.username === post.author ? (
            <div class="col-lg-8">
            <Form style={{marginTop:"50px"}} onSubmit={this.handleUpdate}
            ref={c => {
              this.form = c;
            }}> 
            <div>
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
                placeholder={post.title}
             rows="3"/>
           </div>
            <div class="form-group">
            <label htmlFor="content">Post Description</label>
            <Input 
            class="form-control" 
            id="exampleFormControlTextarea1"
            type="text-area"
                className="form-control"
                name="content"
                value={this.state.content}
                onChange={this.onChangeContent}
                validations={[required]}
                placeholder={post.content}
             rows="3"/>
          </div>
          <div>
            <button class="btn btn-info font-weight-bold" type="submit">Update Post</button>
            <button class="btn btn-danger font-weight-bold" style={{marginLeft:"10px"}}  onClick={this.handledelete}>Delete Post</button>
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
    
                   <hr/>
            <h1 class="mt-4">{post.title}</h1>
              <p class="lead">
                by
                <p>{post.author}</p>
              </p>
              <hr />
              <p>
                <Moment format="Do MMMM YYYY - HH:mm">{post.date}</Moment>
              </p>
              <hr />
              <img
                class="img-fluid rounded"
                src="https://miro.medium.com/max/900/1*po2qa7P4OK9jFMzeE0o7vQ.png"
                alt=""
              />
              <hr />
              <p class="lead">{post.content}</p>
            </div>
            </Form>
            <hr/>

            </div>
           
          ):(
            <div class="col-lg-8">
              <h1 class="mt-4">{post.title}</h1>
              <p class="lead">
                by
                <p>{post.author}</p>
              </p>
              <hr />
              <p>
                <Moment format="Do MMMM YYYY - HH:mm">{post.date}</Moment>
              </p>
              <hr />
              <img
                className="img-fluid rounded"
                src="https://miro.medium.com/max/900/1*po2qa7P4OK9jFMzeE0o7vQ.png"
                alt="BLOG-IMG"
              />
              <hr />
              <p class="lead">{post.content}</p>
            </div>
          )}
            <div class="col-md-4">
              <Sidebar />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SpecificPost;
