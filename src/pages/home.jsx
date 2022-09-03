import React from 'react'
import Axios from 'axios'
import {
	Carousel,
	Card,
	Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavigationBar from '../component/navigationBar'
import Footer from '../component/footer'
const api = 'https://strava-watch.herokuapp.com'
class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			carousels: [],
			products: [],
			page: 1,
			prodPerPage: 4,
			maxPage: 0
		}
	}

	componentDidMount() {
		Axios.get(`${api}/slider`)
			.then(res => {
				this.setState({ carousels: res.data })
				Axios.get(`${api}/products`)
					.then(res => {
						this.setState({ products: res.data, maxPage: Math.ceil(res.data.length / this.state.prodPerPage) })
					})
			})
	}

	onNextPage = () => {
		this.setState({ page: this.state.page + 1 })
	}

	onPrevPage = () => {
		this.setState({ page: this.state.page - 1 })
	}

	showProduct = () => {
		let beginningIndex = (this.state.page - 1) * this.state.prodPerPage
		let currentProduct = this.state.products.slice(beginningIndex, beginningIndex + this.state.prodPerPage)
		console.log(currentProduct)
		return (
			currentProduct.map((item, index) => {
				return (
					<Card style={{ width: '18rem', marginTop: '15px', marginRight: '15px' }} key={index}>
						<Card.Img style={styles.cardImg} variant="top" src={item.images[0]} />
						<Card.Body style={styles.cardBody}>
							<Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
							<Card.Text><strong>IDR {item.price.toLocaleString()}</strong></Card.Text>
							<div style={styles.contButton}>
								{/* <Button variant="outline-light">
									<i className="far fa-bookmark"></i>
								</Button> */}
								<Button variant="outline-light" as={Link} to={`/detail?${item.id}`}>
									<i className="fas fa-cart-plus"></i> Buy Now
								</Button>
							</div>
						</Card.Body>
					</Card>
				)
			})
		)
	}
	render() {
		return (
			<div style={{ backgroundColor: 'white', paddingTop: '10vh' }}>
				<NavigationBar />
				<div>
					<Carousel style={styles.carousel}>
						{this.state.carousels.map((item, index) => {
							return (
								<Carousel.Item key={index}>
									<img
										className="d-block"
										src={item.image}
										alt="First slide"
										style={{ height: '75vh', width: '75vw', objectFit: 'cover', overflow: 'hidden' }}
									/>
									<Carousel.Caption style={styles.caroCaption}>
										<h2>{item.title}</h2>
									</Carousel.Caption>
								</Carousel.Item>
							)
						})}
					</Carousel>
					<div style={styles.sectProducts}>
						<h1 style={{ textAlign: 'center' }}> Best Collections </h1>
						
						<div style={styles.contProducts}>
							{this.showProduct()}
						</div>
						<div style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '25px', display: 'flex', width: '205px', justifyContent: 'space-between', alignItems: 'center' }}>
							<Button onClick={this.onPrevPage} disabled={this.state.page === 1} style={{ backgroundColor: '#0A043C', border: 'none' }} >
								<i class="fa-solid fa-backward"></i>
							</Button>
							<p style={{ marginBottom: '0' }} >Page {this.state.page} of {this.state.maxPage}</p>
							<Button onClick={this.onNextPage} disabled={this.state.page === this.state.maxPage} style={{ backgroundColor: '#0A043C', border: 'none' }} >
								<i class="fa-sharp fa-solid fa-forward"></i>
							</Button>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}

const styles = {
	carousel: {
		height: '75vh',
		width: '75vw',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '35px'
	},
	caroCaption: {
		backgroundColor: 'rgba(0, 0, 0, .5)',
		marginBottom: '5%',
		width: '45%',
		right: '0',
		left: '0',
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	sectProducts: {
		marginTop: '30px',
		marginBottom: '5vh',
		marginLeft: '5vw',
		marginRight: '5vw',
		borderTop: '1px solid black',
		paddingTop: '20px'

	},
	contProducts: {
		display: 'flex',
		flexWrap: 'wrap',
		borderRadius: "10px",
		justifyContent: 'space-around'


	},
	cardImg: {
		padding: '5%',
		height: '200px',
		width: '100%',
		justifyItem: 'center',
		objectFit: 'cover'
	},
	cardBody: {
		backgroundColor: '#03506F',
		borderRadius: '15px 15px 3px 3px',
		color: '#f8f9fa',
		padding: '2.5rem'
	},
	cardTitle: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	contButton: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	
}

export default HomePage