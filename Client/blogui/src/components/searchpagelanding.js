import React, { Component } from 'react'
import queryString from 'query-string'
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments} from '@fortawesome/free-solid-svg-icons'
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
   const loggeduser = JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:5000/api/test/searchpost/${loggeduser.id}/${query.q}`, { method: "POST" })
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
  
              <div key={post.id} className="col-lg-12">
                  
                <div className="list-group mrgn">
                  <span href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                    
                    <Link to={`/singleposts/${post.id}`}><h5 className="mb-1">{post.title}</h5></Link>
           
                    
                    </div>
                    
                    <p className="mb-1">The keyword <span className="font-weight-bold">"{query.q}"</span> exists in this blog. Click on post title to check it out.</p>
                   
                    <FontAwesomeIcon color="orange" className="float-right" icon={faComments}/>
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
