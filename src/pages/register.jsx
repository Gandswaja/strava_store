import React from 'react'
import {
	FormControl,
	InputGroup,
	Button,
	Form,
	Modal
} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { register, resetRegErr } from '../redux/actions'


class RegisPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visibility1: false,
			visibility2: false,
			usernameErr: false,
			emailErr: [false, ""],
			passErr: [false, ""],
			registerErr: [false, ""]
		}
	}

	userValid = (e) => {
		// console.log(e)
		let symb = /[!@#$%^&*]/

		if (symb.test(e.target.value) || e.target.value.length < 6) return this.setState({ usernameErr: true })

		this.setState({ usernameErr: false })
	}

	emailValid = (e) => {
		let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!regex.test(e.target.value)) return this.setState({ emailErr: [true, "Email not valid"] })

		this.setState({ emailErr: [false, ""] })
	}

	passValid = (e) => {
		let number = /[0-9]/
		let symb = /[!@#$%^&*]/

		if (!symb.test(e.target.value) || !number.test(e.target.value) || e.target.value.length < 6) return this.setState({ passErr: [true, "Password must have 6 character, include number and symbol"] })

		this.setState({ passErr: [false, ""] })
	}

	onRegister = () => {
		let username = this.refs.username.value
		let email = this.refs.email.value
		let password = this.refs.password.value

		// cek apakah semua input sudah terisi
		if (!username || !email || !password) return this.setState({ registerErr: [true, "Please input all of data"] })

		// cek apakah ada error dalam validasi input user
		if (this.state.usernameErr[0] || this.state.emailErr[0] || this.state.passErr[0]) return this.setState({ registerErr: [true, "Make sure all of your data is valid"] })

		// cek apakah confirm password sama dengan password
		if (this.refs.confpassword.value !== password) return this.setState({ registerErr: [true, "Confirm password doesn't match with password"] })

		// siapkan object data user
		let obj = {
			username,
			email,
			password,
			role: 'user',
			cart: []
		}

		// action untuk register
		this.props.register(username, email, obj)
		console.log(this.props.register(username, email, obj))
	}

	render() {
		if (this.props.successReg) {
			return <Navigate to="/login" />
		}
		const { visibility1, visibility2 } = this.state
		return (
			<div style={styles.contUtama}>
				<div style={styles.contLeft}></div>
				<div style={styles.contRight}>
					<div style={styles.contForm}>
						<h3 className="mb-3">Register Now</h3>
						<div>
							<label>Username</label>
							<InputGroup>
								<InputGroup.Text id="basic-addon1">
									<i className="fas fa-user-circle"></i>
								</InputGroup.Text>
								<FormControl
									onChange={(e) => this.userValid(e)}
									ref="username"
									placeholder="Input Here"
								/>
							</InputGroup>
							<Form.Text style={styles.textErr}>
								{this.state.usernameErr ? 'Username must have 6 character & can\'t include symbol\n\n' : ''}
							</Form.Text>
						</div>
						<div>
							<label>Email</label>
							<InputGroup>
								<InputGroup.Text id="basic-addon1" >
									<i className="fas fa-envelope"></i>
								</InputGroup.Text>
								<FormControl
									placeholder="Input Here"
									onChange={(e) => this.emailValid(e)}
									ref="email"
								/>
							</InputGroup>
							<Form.Text style={styles.textErr}>
								{this.state.emailErr[0] ? this.state.emailErr[1] : ""}
							</Form.Text>
						</div>
						<div>
							<label>Password</label>
							<InputGroup>
								<InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility1: !visibility1 })}>
									{visibility1 ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
								</InputGroup.Text>
								<FormControl
									placeholder="Input Here"
									type={visibility1 ? "text" : "password"}
									onChange={(e) => this.passValid(e)}
									ref="password"
								/>
							</InputGroup>
							<Form style={styles.textErr}>
								{this.state.passErr[0] ? this.state.passErr[1] : ""}
							</Form>
						</div>
						<div className='mb-3'>
							<label>Confirm Password</label>
							<InputGroup>
								<InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility2: !visibility2 })}>
									{visibility2 ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
								</InputGroup.Text>
								<FormControl
									placeholder="Input Here"
									type={visibility2 ? "text" : "password"}
									ref="confpassword"
								/>
							</InputGroup>
						</div>
						<div style={styles.contButton}>
							<div>
								<Button variant="primary" style={styles.button} onClick={this.onRegister}>
									<i className="fas fa-user-plus" style={{ marginRight: '10px' }}></i>
									Register
								</Button>
							</div>
						</div>
						<div>
							<p style={styles.goToRegis}>Already Have an Account? <Link style={{ color: '#303f9f', fontWeight: 'bold' }} to="/login">Login </Link></p>
							<p style={styles.goToRegis}>Go to <Link style={{ color: '#303f9f', fontWeight: 'bold' }} to="/">Home</Link></p>

						</div>
					</div>
				</div>
				<Modal show={this.state.registerErr[0]}>
					<Modal.Header>
						<Modal.Title>Error!</Modal.Title>
					</Modal.Header>
					<Modal.Body>{this.state.registerErr[1]}</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={() => this.setState({ registerErr: [false, ""] })}>
							OK
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal show={this.props.errorReg[0]}>
					<Modal.Header>
						<Modal.Title>Error!</Modal.Title>
					</Modal.Header>
					<Modal.Body>{this.props.errorReg[1]}</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={this.props.resetRegErr}>
							OK
						</Button>
					</Modal.Footer>
				</Modal>
			</div >
		)
	}
}

const styles = {
	contUtama: {
		display: 'flex',
		Height: '100vh'
	},
	contLeft: {
		flexBasis: '45%',
		background: "url(https://images.pexels.com/photos/1353065/pexels-photo-1353065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1) no-repeat center",
		backgroundSize: 'cover'
	},
	contRight: {
		flexBasis: '55%',
		paddingTop: '1vh',
		paddingBottom: '8vh',
		backgroundColor: 'white'
		
	},
	contForm: {
		width: '40vw',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: '30px',
		padding: '10% 2%',

	},
	contButton: {
		display: 'flex',
		marginBottom: '10px',

	},
	button: {
		backgroundColor: '#303f9f',
		border: 'none'
	},
	goToRegis: {
		fontWeight: 'bold',
		textAlign: 'left',
		marginBottom: '0'
	},
	textErr: {
		color: 'red',
		marginBottom: '15px'
	}
}

const mapStateToProps = (state) => {
	return {
		errorReg: state.userReducer.errorRegister,
		successReg: state.userReducer.successRegister
	}
}

export default connect(mapStateToProps, { register, resetRegErr })(RegisPage)