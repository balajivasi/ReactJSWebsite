import React from 'react'
import axios from 'axios'

export class PageDetails extends React.Component{
	constructor(props){
		super(props)
		this.state={
			PageDetails:[]
		}
		this.pageDetails=this.pageDetails.bind(this)
	}
	pageDetails(){
		let imdbID=this.props.params.imdbID
		let urldetails= `http://www.omdbapi.com/?i=${imdbID}&plot=full`
		console.log(urldetails)
		axios.get(urldetails)
			 .then((response)=>{
			 	this.setState({
			 		PageDetails:response.data
			 	})
			 })
			 .catch((error)=>{
			 	console.log(`page Detaisl ajax response ERROR: ${error}`)
			 })
	}
	componentWillMount(){
		this.pageDetails()
	}

	render(){
		let PageDetails=this.state.PageDetails
		let image=(PageDetails.Poster != "N/A") ? PageDetails.Poster : "http://placehold.it/500x500"
		return 	<div className="col-lg-12 p-0">
					<div className="col-lg-4 m-0 p-0 detailsimg">
						<img src={image} />
					</div>
					<div className="col-lg-8 pull-right m-0 p-0">
							<div className="page-header m-0">
							  <h1 className="m-0">{PageDetails.Title}</h1>
							  <h5 className="m-0"><strong>Director:</strong> {PageDetails.Director} &nbsp;&nbsp;&nbsp; <strong>Year:</strong> {PageDetails.Year}</h5>
							  <h6 className="m-0"><strong>Released:</strong> {PageDetails.Released}</h6>
							</div>
							<div className="col-lg-12 m-0 mt-20 p-0">
								<p>{PageDetails.Plot}</p>
							</div>
					</div>
				</div>
	}
}