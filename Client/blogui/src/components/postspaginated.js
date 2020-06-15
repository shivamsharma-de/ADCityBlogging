/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CommentsModel from "./CommentsModel";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faThumbsUp,
	faThumbsDown,
	faUser,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "./sidebar";
import "./card.css";

const styleFooter = {
	position: "absolute",
	width: "100%",
};

class Posts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pager: {},
      pageOfItems: [],
      isCommentShow: false
		};
	}

	componentDidMount() {
		this.loadPage();
	}

	componentDidUpdate() {
		this.loadPage();
	}

  // handleComment() {
  //   this.setState({isCommentShow: true});
  // }

	loadPage() {
		// get page of items from api
		const params = new URLSearchParams(window.location.search);
		const page = parseInt(params.get("page")) || 1;
		if (page !== this.state.pager.currentPage) {
			fetch(`http://localhost:5000/api/test/posts?page=${page}`, {
				method: "GET",
			})
				.then((response) => response.json())
				.then(({ pager, pageOfItems }) => {
					this.setState({ pager, pageOfItems });
				});
		}
	}

	render() {
    const { pager, pageOfItems } = this.state;
    
		return (
			<div>
				<div className='fixed-top'>
					<Header />
				</div>
				<div className='container mrgn'>
					<div className='row'>
						<div className='col-lg-8'>
							{pageOfItems.map((post) => (
								<div key={post._id} className=' col-lg-12'>
									<div className='card text-center border-secondary card-style'>
										<Link to={`/singleposts/${post._id}`}>
											<div className='card-header text-white bg-secondary'>
												<h5 className='card-title'>{post.title}</h5>
											</div>
										</Link>

										<div className='card-body'>
											<p className='card-text'>{post.content}</p>
										</div>
										<div className='card-footer d-flex justify-content-between'>
											<span>
												<FontAwesomeIcon
													className='mr-3'
													icon={faThumbsUp}
													style={{ cursor: "pointer" }}
													color='red'
												/>
												<FontAwesomeIcon
													icon={faThumbsDown}
													color='red'
													style={{ cursor: "pointer" }}
												/>
											</span>
											<p className='text-success'>
												{" "}
												<Moment fromNow>{post.date}</Moment>
											</p>

											<Link to={`/userprofile/${post.user}`}>
												<span>
													<FontAwesomeIcon className='mr-1' icon={faUser} />
													{post.author}
												</span>
											</Link>
                      <span>
                        <CommentsModel/>
                      </span>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className='col-md-4'>
							<Sidebar />
						</div>
					</div>
				</div>

				<div className=''>
					{pager.pages && pager.pages.length && (
						<ul className='pagination'>
							<li
								className={`page-post first-post ${
									pager.currentPage === 1 ? "disabled" : ""
								}`}>
								<Link to={{ search: `?page=1` }} className='page-link'>
									First
								</Link>
							</li>
							<li
								className={`page-post previous-post ${
									pager.currentPage === 1 ? "disabled" : ""
								}`}>
								<Link
									to={{ search: `?page=${pager.currentPage - 1}` }}
									className='page-link'>
									Previous
								</Link>
							</li>
							{pager.pages.map((page) => (
								<li
									key={page}
									className={`page-post number-item ${
										pager.currentPage === page ? "active" : ""
									}`}>
									<Link to={{ search: `?page=${page}` }} className='page-link'>
										{page}
									</Link>
								</li>
							))}
							<li
								className={`page-post next-item ${
									pager.currentPage === pager.totalPages ? "disabled" : ""
								}`}>
								<Link
									to={{ search: `?page=${pager.currentPage + 1}` }}
									className='page-link'>
									Next
								</Link>
							</li>
							<li
								className={`page-post last-item ${
									pager.currentPage === pager.totalPages ? "disabled" : ""
								}`}>
								<Link
									to={{ search: `?page=${pager.totalPages}` }}
									className='page-link'>
									Last
								</Link>
							</li>
						</ul>
					)}
				</div>
				<div style={styleFooter}>
					<Footer />
				</div>
			</div>
		);
	}
}

export default Posts;
