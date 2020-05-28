import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Moment from "react-moment";
import Sidebar from "./sidebar";
import {Link }from 'react-router-dom'
export class Userprofile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      user:{},
    };
  }
  componentDidMount() {
    this.loadPage();
  }

  loadPage() {
    const id = this.props.match.params;
    console.log(id);
    fetch(`http://localhost:5000/api/test/specificuser/${id.id}`, { method: "GET" })
      .then((response) => response.json())
      .then((user) => {
        this.setState(() => ({ user }));
      });
      fetch(`http://localhost:5000/api/test/specificuserposts/${id.id}`, { method: "GET" })
      .then((response) => response.json())
      .then((posts) => {
        this.setState(() => ({ posts }));
      });
  }


  render() {
    const { posts } = this.state;
    const {user} = this.state;


    return (
      <div>
      <div className="fixed-top">
        <Header/>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-lg-8">
            <div className= "card card-body" style={{padding: "10%", margin:"10px"}}>
            
        <div className="card-body text-left">

        <h3>{user.firstname} {user.lastname}</h3>
        <hr/>

            <p>{user.aboutme}</p>
            <p>I ive in {user.city}</p>
            go checkout me on <button type="button" class="btn btn-link">{user.website}</button>
            </div>
            </div>
            <hr/>
           <h5> Posts by Author {user.firstname}</h5>
           <hr/>
            {posts.map((post1) => ( 
                <article key={post1._id}>
              <h1 class="mt-4">{post1.title}</h1>

            
                by
                <Link to={`/userprofile/${post1._id}`}>
                <button type="button" className="btn btn-link">
                  {post1.author}{" "}
                </button>
             
                </Link>
             

              <hr />

              <p>
                <Moment format="Do MMMM YYYY - HH:mm">{post1.date}</Moment>
              </p>

              <hr />

              <img
                class="img-fluid rounded"
                src="https://miro.medium.com/max/900/1*po2qa7P4OK9jFMzeE0o7vQ.png"
                alt=""
              />

              <hr />

              <p class="lead">{post1.content}</p>
             
              </article>
             
              ))}
              <hr/>
            </div>
           

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

export default Userprofile;
