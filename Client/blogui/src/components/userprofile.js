/** @format */

import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Moment from "react-moment";
import Sidebar from "./sidebar";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faThumbsUp,
	//faThumbsDown,
	faComments,
} from "@fortawesome/free-solid-svg-icons";

const follower = [
	{
		username: "Adams",
		Userid: "5ecf8wewe4df1a3ea800133bd67f",
	},
	{
		username: "Ray",
		Userid: "5edd3dss3e4387f2179018fb716",
	},
	{
		username: "Horang",
		Userid: "5edd3d321ss3e4387f2179018fb716",
	},
	{
		username: "Franklin",
		Userid: "5edd3ds093s3e4387f2179018fb716",
	},
	{
		username: "Paul",
		Userid: "5edd3dss3e4387f2179014348fb716",
	},
	{
		username: "Angel",
		Userid: "5edd3ds4322s3e4387f2179018fb716",
	},
];
const following = [
	{
		username: "Jhon",
		Userid: "5ecf8wewe4df1a3ea800133bd67f",
	},
	{
		username: "Alex",
		Userid: "5edd3dss3e4387f2179018fb716",
	},
	{
		username: "Jane",
		Userid: "5edd3d321ss3e4387f2179018fb716",
	},
	{
		username: "Jane",
		Userid: "5edd3d321ss3e4387f2179018fb716",
	},
	{
		username: "Marry",
		Userid: "5edd3ds093s3e4387f2179018fb716",
	},
	{
		username: "Chang",
		Userid: "5edd3dss3e4387f2179014348fb716",
	},
	{
		username: "Angel",
		Userid: "5edd3ds4322s3e4387f2179018fb716",
	},
];

const styleFooter = {
	position: "absolute",
	width: "100%",
};

export class Userprofile extends Component {

	

	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			user: {},
			isfollowing: true,
			redirectToUser: null,
			
			
		};
	}
	componentDidMount() {
		this.loadPage();
	}

	redirectToUserPage = (event) => {
		console.log(event.target.value);

		this.setState({
			redirectToUser: event.target.value,
		});
	};
	
	loadPage() {
		const id = this.props.match.params;
		console.log(id);
		fetch(`http://localhost:5000/api/test/specificuser/${id.id}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((user) => {
				this.setState(() => ({ user }));
			});
		fetch(`http://localhost:5000/api/test/specificuserposts/${id.id}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((posts) => {
				this.setState(() => ({ posts }));
			});
	}

	render() {
		
		const { posts } = this.state;
		const { user } = this.state;

		if (this.state.redirectToUser) {
			return <Redirect to={`/userprofile/${this.state.redirectToUser}`} push />;
		}
		console.log(this.state.isfollowing);
		return (
			
			<div>
				<div className='fixed-top'>
					<Header />
				</div>

				<div class='container mrgn'>
					<div class='row'>
						
						<div class='col-lg-8'>
							<div className='card card-body' style={{ padding: "5%" }}>
								<div className='card-body text-left'>
									<button type="submit" onClick={()=> this.setState({isfollowing: !this.state.isfollowing})} class={this.state.isfollowing ? " btn btn-success float-right" : "btn btn-danger float-right"}>
											{this.state.isfollowing ? 'Follow' : 'Unfollow'}
										
									</button>	
									<h3>
										{user.firstname} {user.lastname}
									</h3>	
									<hr />
									
									<p>{user.aboutme}</p>
									<p>I ive in {user.city}</p>
									go checkout me on{" "}
									<button type='button' class='btn btn-link'>
										{user.website}
									</button>
								</div>
								<div className='container'>
									<div className='d-flex'>
										<div class='input-group m-3'>
											<div class='input-group-prepend'>
												<label
                          class='input-group-text bg-info text-white'
													for='inputGroupSelect01'>
													Following
												</label>
											</div>
											<select
												class='custom-select'
												onChange={(event) => this.redirectToUserPage(event)}
												id='inputGroupSelect01'>
												{following.map((elem) => {
													return (
														<option value={elem.Userid}>{elem.username}</option>
													);
												})}
											</select>
										</div>
										<div class='input-group m-3'>
											<div class='input-group-prepend'>
												<label
													class='input-group-text bg-info text-white'
													for='inputGroupSelect01'>
													Followers
												</label>
											</div>
											<select
                        	onChange={(event) => this.redirectToUserPage(event)}
												class='custom-select'
												id='inputGroupSelect01'>
												{follower.map((elem) => {
													return (
														<option value={elem.Userid}>{elem.username}</option>
													);
												})}
											</select>
										</div>
									</div>
								</div>
								



							</div>
							<h5 className='mt-3'> Posts by Author {user.firstname}</h5>

							

							{posts.map((post) => (
								<div key={post._id} className=' col-md-12'>
									<div className='card text-center border-secondary card-style'>
										<Link to={`/singleposts/${post._id}`}>
											<div className='card-header text-white bg-secondary'>
												<h5 className='card-title'>{post.title}</h5>
											</div>
										</Link>
										<img
											class='img-fluid rounded'
											src='https://miro.medium.com/max/900/1*po2qa7P4OK9jFMzeE0o7vQ.png'
											alt=''
										/>

										<div className='card-body'>
											<p className='card-text'>{post.content}</p>
										</div>
										<div className='card-footer d-flex justify-content-between'>
											<Link to='/'>
												<FontAwesomeIcon icon={faThumbsUp} color='red' />
											</Link>
											{/* <span><FontAwesomeIcon icon={faThumbsDown} color="red"/></span> */}
											<p className='text-success'>
												{" "}
												<Moment format='Do MMMM YYYY - HH:mm'>
													{post.date}
												</Moment>
											</p>

											<Link to={`/userprofile/${post.user}`}>
												<span className='ml-5'>by - </span> {post.author}
											</Link>
											<Link to={`/userprofile/${post.user}`}>
												<FontAwesomeIcon color="orange" icon={faComments} />
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>

						<div class='col-md-4'>
							<Sidebar />
						</div>
					</div>
				</div>
				<div style={styleFooter}>
					<Footer />
				</div>
			</div>
		);
	}
}

export default Userprofile;
