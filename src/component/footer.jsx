import React from 'react'

class Footer extends React.Component {
	render() {
		return (
			<div id='footer' style={styles.cont}>
				<div>
					<i class="fa fa-whatsapp fa-2xl"></i> <nsbp />
					+6287-858-919-981
				</div>
				<div>
					<i class="fal fa-map-marker-alt fa-2xl"></i> <nsbp />
					Taman Senayan II, Blok HI2, Bintaro Jaya Sektor 9, Tangerang Selatan
				</div>
				<div>
					<i class="fa fa-instagram fa-2xl"></i>  <nsbp />
					Strava_Watch_Store
				</div>
				


			</div>
		)
	}
}

const styles = {
	cont: {
		backgroundColor: 'white',
		// backgroundColor: '#03506F',

		display: 'flex',
		justifyContent: 'space-around',
		fontWeight: 'bold',
		padding: '5vh',
		flexWrap: 'wrap',
		color: 'black',		
	}
}

export default Footer