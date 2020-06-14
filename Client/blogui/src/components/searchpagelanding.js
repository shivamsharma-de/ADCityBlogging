import React, { Component } from 'react'
import queryString from 'query-string'
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Sidebar from "./sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faComments, faUser} from '@fortawesome/free-solid-svg-icons'
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
  
              <div key={post._id} className="col-lg-12">
                  
                <div className="list-group mrgn">
                  <span href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                    
                    <Link to={`/singleposts/${post._id}`}><h5 className="mb-1">{post.title}</h5></Link>
                    <Link to={`/userprofile/${post.user}`}><FontAwesomeIcon icon={faUser} /><small className="text-primary font-weight-bold ml-1">Posted by- { post.author}</small></Link>
                    </div>
                    
                    <p className="mb-1">The keyword <span className="font-weight-bold">"{query.q}"</span> exists in this blog. Click on post title to check it out.</p>
                    <FontAwesomeIcon className="float-left text-danger" icon={faThumbsUp}/>
                    <small className="text-success font-weight-bold"><Moment fromNow>{post.date}</Moment></small>
                    <FontAwesomeIcon className="float-right text-primary" icon={faComments}/>
                  </span>
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
