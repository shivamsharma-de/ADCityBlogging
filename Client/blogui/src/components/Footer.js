import React from "react";
import '../footer.css';

const FooterPage = () => {
  return (
    
    <div className="container-flex">
    

    <div className="bottom">

    <footer className="footer-bs">
        <div className="row">
        	<div className="col-md-6 footer-brand animated fadeInLeft">
            	<h2>MIA</h2>
                <p>Maintained by mannheim Indian Association.</p>
                <p>© 2020 MIA, All rights reserved</p>
            </div>
        	<div className="col-md-6 footer-social animated fadeInDown">
            	<h4>Follow Us</h4>
            	<ul>
                	<li><a href="www.facebook.com">Facebook</a></li>
                	<li><a href="www.twitter.com">Twitter</a></li>
                	<li><a href="www.instagram.com">Instagram</a></li>
                </ul>
            </div>

        </div>
    </footer>
    </div>
    
</div>
  );
}

export default FooterPage;