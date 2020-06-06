/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Header from "./Header";
import Footer from "./Footer";
import AuthService from "../services/auth.service";

const styleFooter = {
	margin: "0 auto",
	position: "absolute",
	width: "100%",
};

const main = {
	margin: "0 auto",
	padding: "6.1% 0",
};

const required = (value) => {
	if (!value) {
		return (
			<div className='alert alert-danger' role='alert'>
				This field is required!
			</div>
		);
	}
};

const email = (value) => {
	if (!isEmail(value)) {
		return (
			<div className='alert alert-danger' role='alert'>
				This is not a valid email.
			</div>
		);
	}
};

const vusername = (value) => {
	if (value.length < 3 || value.length > 20) {
		return (
			<div className='alert alert-danger' role='alert'>
				The username must be between 3 and 20 characters.
			</div>
		);
	}
};

const vpassword = (value) => {
	if (value.length < 6 || value.length > 40) {
		return (
			<div className='alert alert-danger' role='alert'>
				The password must be between 6 and 40 characters.
			</div>
		);
	}
};

class Signup extends Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
		this.onChangeFirstname = this.onChangeFirstname.bind(this);
		this.onChangeLastname = this.onChangeLastname.bind(this);

		this.onChangeGender = this.onChangeGender.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);

		this.state = {
			firstname: "",
			lastname: "",
			gender: "",
			username: "",
			email: "",
			password: "",
			successful: false,
			message: "",
		};
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}
	onChangeFirstname(e) {
		this.setState({
			firstname: e.target.value,
		});
	}
	onChangeLastname(e) {
		this.setState({
			lastname: e.target.value,
		});
	}
	onChangeGender(e) {
		this.setState({
			gender: e.target.value,
		});
	}

	onChangeEmail(e) {
		this.setState({
			email: e.target.value,
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value,
		});
	}

	handleRegister(e) {
		e.preventDefault();

		this.setState({
			message: "",
			successful: false,
		});

		this.form.validateAll();

		if (this.checkBtn.context._errors.length === 0) {
			AuthService.register(
				this.state.firstname,
				this.state.lastname,
				this.state.gender,
				this.state.username,
				this.state.email,
				this.state.password
			).then(
				(response) => {
					this.setState({
						message: response.data.message,
						successful: true,
					});
				},
				(error) => {
					const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();

					this.setState({
						successful: false,
						message: resMessage,
					});
				}
			);
		}
	}
	render() {
		return (
			<div>
				<div className='fixed-top'>
					<Header />
				</div>

				<div className='container'>
					<div style={main} className='row'>
						<div className='col-12 col-md-9 offset-md-2'>
							<Form
								onSubmit={this.handleRegister}
								ref={(c) => {
									this.form = c;
								}}>
								{!this.state.successful && (
									<>
										<div className='form-group row'>
											<label
												for='firstname'
												className='col-md-2 col-form-label'>
												Firstname
											</label>
											<div className='col-md-4'>
												<input
													type='text'
													className='form-control'
													id='firstname'
													name='firstname'
													placeholder='First name'
													value={this.state.firstname}
													onChange={this.onChangeFirstname}
													validations={[required]}
												/>
											</div>
											<label for='lastname' className='col-md-2 col-form-label'>
												Lastname
											</label>
											<div className='col-md-4'>
												<input
													type='text'
													className='form-control'
													id='lastname'
													name='lastname'
													placeholder='Last name'
													value={this.state.lastname}
													onChange={this.onChangeLastname}
													validations={[required]}
												/>
											</div>
										</div>

										<div className='form-group row'>
											<label for='username' className='col-md-2 col-form-label'>
												Username
											</label>
											<div className='col-md-4'>
												{/* <span className='input-group-prepend input-group-text'>@</span> */}

												<Input
													type='text'
													className='form-control'
													placeholder='Username'
													value={this.state.username}
													onChange={this.onChangeUsername}
													validations={[required, vusername]}
												/>
											</div>
											<label for='username' className='col-md-2 col-form-label'>
												Gender
											</label>
											<div className='col-md-4'>
												<Input
													type='text'
													className='form-control'
													placeholder='Gender'
													value={this.state.gender}
													onChange={this.onChangeGender}
													validations={[required]}
												/>
											</div>
										</div>

										<div className='form-group row'>
											<label
												className='col-md-2 col-form-label'
												htmlFor='inputEmail43'>
												Email
											</label>
											<div className='col-md-4'>
												<Input
													type='text'
													className='form-control'
													placeholder='Email'
													value={this.state.email}
													onChange={this.onChangeEmail}
													validations={[required, email]}
												/>
												<small id='emailHelp' className='form-text text-muted'>
													We'll never share your email with anyone.
												</small>
											</div>

											<label
												className='col-md-2 col-form-label'
												htmlFor='password'>
												Password
											</label>
											<div className='col-md-4'>
												<Input
													type='password'
													className='form-control'
													placeholder='Password'
													value={this.state.password}
													onChange={this.onChangePassword}
													validations={[required, vpassword]}
												/>
											</div>
										</div>
										<div className='form-group row pt-3'>
											<label
												className='col-md-2 col-form-label'
												htmlFor='intrestedin'>
												Intrested in:
											</label>

											<div className='col-md-10 d-flex justify-content-center'>
												<div class='form-check form-check-inline'>
													<input
														class='form-check-input'
														type='checkbox'
														id='inlineCheckbox1'
														value='option1'
													/>
													<label class='form-check-label' for='inlineCheckbox1'>
														Flights
													</label>
												</div>
												<div class='form-check form-check-inline'>
													<input
														class='form-check-input'
														type='checkbox'
														id='inlineCheckbox2'
														value='option2'
													/>
													<label class='form-check-label' for='inlineCheckbox2'>
														Universities
													</label>
												</div>
												<div class='form-check form-check-inline'>
													<input
														class='form-check-input'
														type='checkbox'
														id='inlineCheckbox2'
														value='option2'
													/>
													<label class='form-check-label' for='inlineCheckbox2'>
														Visas
													</label>
												</div>
												<div class='form-check form-check-inline'>
													<input
														class='form-check-input'
														type='checkbox'
														id='inlineCheckbox2'
														value='option2'
													/>
													<label class='form-check-label' for='inlineCheckbox2'>
														Accomodation
													</label>
												</div>
												<div class='form-check form-check-inline'>
													<input
														class='form-check-input'
														type='checkbox'
														id='inlineCheckbox2'
														value='option2'
													/>
													<label class='form-check-label' for='inlineCheckbox2'>
														CityOffice
													</label>
												</div>
											</div>
										</div>

										<div className='row'>
											<div className='col-md-12'>
												<button
													type='submit'
													className='btn btn-dark font-weight-bold mt-3'>
													Sign Up
												</button>
											</div>
										</div>
										<div className='row'>
											<div className='col-md-12'>
												<p className='text-primary mt-3'>
													already have an account ?
													<Link to='/login' className='text-reset'>
														Login
													</Link>
													.
												</p>
											</div>
										</div>
									</>
								)}
								{this.state.message && (
									<div className='form-group'>
										<div
											className={
												this.state.successful
													? "alert alert-success"
													: "alert alert-danger"
											}
											role='alert'>
											{this.state.message}
										</div>
									</div>
								)}
								<CheckButton
									style={{ display: "none" }}
									ref={(c) => {
										this.checkBtn = c;
									}}
								/>
							</Form>
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

export default Signup;
