/** @format */

import React, { Component } from "react";
import axios from "axios";
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
			isfollowing: false,
			redirectToUser: null,
			following: [],
			follower: [],
			firstname: "",
			lastname: "",
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

	followUnfollow = () => {
		let senderId = JSON.parse(localStorage.getItem("user")).id;
		let userId = this.props.match.params.id;
		if (this.state.isfollowing) {
			axios
				.post(`http://localhost:5000/api/test/unfollow/${senderId}/${userId}`)
				.then((res) => {
					this.setState({
						isfollowing: false,
					});
				});
		} else {
			axios
				.post(`http://localhost:5000/api/test/follow/${senderId}/${userId}`)
				.then((res) => {
					this.setState({
						isfollowing: true,
					});
				});
		}
	};

	isFollowing = () => {
		JSON.parse(localStorage.getItem("user")).following.forEach((elem) => {
			if (elem.id === this.props.match.params.id) {
				console.log(
					JSON.parse(localStorage.getItem("user")).following,
					this.props.match.params.id
				);
				this.setState({
					isfollowing: true,
				});
			}
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
				this.setState({
					user: user,
					follower: user.follower,
					following: user.following,
					firstname: user.firstname,
					lastname: user.lastname,
				});
				this.isFollowing();
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
			window.location.reload();
			return <Redirect to={`/userprofile/${this.state.redirectToUser}`} push />;
		}
		console.log(
			this.state.isfollowing,
			this.props.match.params.id,
			JSON.parse(localStorage.getItem("user")).id
		);
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
									{this.props.match.params.id ===
									JSON.parse(localStorage.getItem("user")).id ? (
										<span></span>
									) : (
										<button
											type='submit'
											onClick={() => this.followUnfollow()}
											class={
												!this.state.isfollowing
													? " btn btn-success float-right"
													: "btn btn-danger float-right"
											}>
											{this.state.isfollowing ? "Unfollow" : "Follow"}
										</button>
									)}
									<h3>{this.state.firstname + " " + this.state.lastname}</h3>
									<hr />
									<img
											className="float-right"
											width="20%"
											src={require("./no-img.png")}
											alt="Profile"
									/>
									<p>{user.aboutme}</p>
									<p>I live in {user.city}</p>
									Go checkout me on
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
											<>
												{this.state.following.length > 0 ? (
													<select
														onChange={(event) => this.redirectToUserPage(event)}
														class='custom-select'
														id='inputGroupSelect01'>
														{this.state.following.map((elem) => {
															return (
																<option value={elem.id}>{elem.fullname}</option>
															);
														})}
													</select>
												) : (
													<p>Following none</p>
												)}
											</>
										</div>
										<div class='input-group m-3'>
											<div class='input-group-prepend'>
												<label
													class='input-group-text bg-info text-white'
													for='inputGroupSelect01'>
													Followers
												</label>
											</div>
											<>
												{this.state.follower.length > 0 ? (
													<select
														onChange={(event) => this.redirectToUserPage(event)}
														class='custom-select'
														id='inputGroupSelect01'>
														{this.state.follower.map((elem) => {
															return (
																<option value={elem.id}>{elem.fullname}</option>
															);
														})}
													</select>
												) : (
													<p>No Followers</p>
												)}
											</>
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
												<FontAwesomeIcon color='orange' icon={faComments} />
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
