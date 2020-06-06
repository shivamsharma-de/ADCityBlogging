import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./home.css";

import { Link } from "react-router-dom";

const styleFooter = {
  margin: "0 auto",
  position: "absolute",
  width: "100%"
};

export class Home extends Component {
  render() {
    return (
      <div>
        <div className="fixed-top">
          <Header />
        </div>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="first-slide"
                src={require("./mannheim.jpg")}
                alt="First slide"
              />
              <div className="container">
                <div className="carousel-caption text-left">
                  <h1>Pretty Exciting Community.</h1>
                  <p>
                    This is the site for the people who are either Indians or
                    just want to explore the culture with our Indians Group in
                    Mannheim.
                  </p>
                  <p>
                    <Link
                      className="btn btn-lg btn-primary"
                      to="/signup"
                      role="button"
                    >
                      Sign up today
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="second-slide"
                src={require("./travel.jpg")}
                alt="Second slide"
              />
              <div className="container">
                <div className="carousel-caption">
                  <h1 className="text-dark">New in the city</h1>
                  <p className="text-dark">
                    Just came to Mannheim for studies or for a job, get help and
                    get to know the community.{" "}
                  </p>
                  <p>
                    <Link
                      className="btn btn-lg btn-primary"
                      to="/signup"
                      role="button"
                    >
                      Join Today
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="third-slide"
                src={require("./scene.png")}
                alt="Third slide"
              />
              <div className="container">
                <div className="carousel-caption text-right">
                  <h1 className="text-white">Updates and stories </h1>
                  <p className="text-white">
                    All the updates and stories you will get it over here by our
                    members.
                  </p>
                  <p>
                    <Link
                      className="btn btn-lg btn-primary"
                      to="/posts"
                      role="button"
                    >
                      Browse Posts
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#myCarousel"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#myCarousel"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        <div style={styleFooter}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;
