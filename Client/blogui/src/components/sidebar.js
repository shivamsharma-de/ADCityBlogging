/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
	constructor(props) {
		super(props);
		// this.onChangeSearch = this.onChangeSearch.bind(this);
		this.onChangeInputSearch = this.onChangeInputSearch.bind(this);
		this.state = {
			query: "",
		};
	}
	onChangeInputSearch = (e) => {
		this.setState({
			query: e.target.value,
		});
	};
	onHandleGo(e) {}

	render() {
		return (
			<div>
				<div className='card'>
					<h5 className='card-header'>Search</h5>
					<div className='card-body'>
						<div className='input-group'>
							<input
								type='text'
								className='form-control'
								placeholder='write any keyword to look in '
								onChange={this.onChangeInputSearch}
								value={this.state.query}
							/>
							<span className='input-group-btn'>
								{/* <Link to ={`/search/?q=${this.state.query}`}>
              <button className="btn btn-secondary" type="button">Search Post</button>
              </Link>
              <Link to ={`/search/?q=${this.state.query}`}>
              <button className="btn btn-secondary" type="button">Search User</button>
              </Link> */}
							</span>
						</div>
						<div className='input-group-btn d-flex justify-content-around py-3'>
							<Link to={`/search/?q=${this.state.query}`}>
								<button className='btn btn-primary' type='button'>
									Search in Posts
								</button>
							</Link>
							<Link to={`/search`}>
								<button className='btn btn-success' type='button'>
									Search in Users
								</button>
							</Link>
						</div>
					</div>
				</div>

				<div className='card my-4'>
					<h5 className='card-header'>Useful Links</h5>
					<div className='card-body'>
						<div className='row'>
							<div className='col-lg-6'>
								<ul className='list-unstyled mb-0'>
									<li>
										<a href='https://www.mannheim.de/en'>Stadt Mannheim</a>
									</li>
									<li>
										<a href='https://www.uni-mannheim.de/en/'>
											Universitat Mannheim
										</a>
									</li>
									<li>
										<a href='https://www.hochschule-heidelberg.de/'>
											SRH Heidelberg
										</a>
									</li>
								</ul>
							</div>
							<div className='col-lg-6'>
								<ul className='list-unstyled mb-0'>
									<li>
										<a href='https://indianembassyberlin.gov.in/'>
											Emabassy of India in Berlin
										</a>
									</li>
									<li>
										<a href='https://cgifrankfurt.gov.in/'>
											Frankfurt Consulate
										</a>
									</li>
									<li>
										<a href='https://www.mea.gov.in/'>
											Ministry of External Affairs
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className='card my-4'>
					<h5 className='card-header'>News</h5>
					<div className='card-body'>
					<img className="img-fluid float-left "
                    width="40%"
                src={require("./blog.png")}
                alt="Blog"
              />
						<span classsName="float-right">News Update will come here in future enhancements.</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Sidebar;
