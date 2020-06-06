import React, { Component } from 'react'
import queryString from 'query-string'
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Sidebar from "./sidebar";
import Header from "./Header";
import Footer from "./Footer";
import './card.css'


const styleFooter = {
  position: 'absolute',
  width: "100%"
}


export class Searchpage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts:[]
             
        }
    }
    componentDidMount(){
        this.loadPage()
       
     
    }
    loadPage() {
   const query = new queryString.parse(this.props.location.search)
        
        fetch(`http://localhost:5000/api/find/${query.q}`, { method: "GET" })
          .then((response) => response.json())
          .then((posts) => {
            this.setState(() => ({ posts }));
            
          });
        
      }
    
    render() {
        const {posts} = this.state
        // window.location.reload();
        const query = new queryString.parse(this.props.location.search)
        return (
            <div>
            <div className="fixed-top">
            <Header/>
            </div>

            <div className="container mrgn">
              <div className="row">
            <div className="col-lg-8" >
            <div><h2>You searched for "{query.q}"</h2></div>
            {posts.map((post) => (
  
              <div key={post._id} className="col-lg-10">
                  <div className="card text-center border-secondary card-style">
   
                    <Link to={`/singleposts/${post._id}`}>
                      <div className="card-header text-white bg-secondary">
                       <h5 className="card-title">{post.title}{" "}</h5>
                      </div>
                    </Link>
                  
                  <div className="card-body">
                    <p className="card-text">{post.content}</p>
                    
                  </div>
                  <div className="card-footer text-primary">
                    
                    <p>  <Moment fromNow>{post.date}</Moment></p>
                    by - <Link to={`/userprofile/${post.user}`}>
                    
                      { post.author}
                    
                    </Link>
                  </div>
               </div>
             </div>
            ))}
            </div>
            <div className="col-md-4">
            <Sidebar />
          </div>
            </div>
         
            </div>
            <div style={styleFooter}><Footer /></div>
            
            </div>
        )
    }
}

export default Searchpage
