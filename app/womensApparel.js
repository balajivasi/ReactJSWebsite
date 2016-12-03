
import React from 'react'
import axios from 'axios'

class Products extends React.Component{
	constructor(props){
		super(props)
		this.addToCart=this.addToCart.bind(this)
	}
	addToCart(e){
		console.log(this.props.itemsIist)
	}
	render(){
		var data = this.props.itemsIist;
		return <div  className="panel panel-success">
				  <div className="panel-heading">
				    <h3 className="panel-title">{data.first_name} {data.last_name}</h3>
				  </div>
				  <div className="panel-body">
				    <div className="avatarImg"><img src={data.avatar} /></div>
				    <div className="col-lg-7 p-0">
					    <span className="price"><strong>Price:</strong> {data.price}</span><br />
					    <span className="price"><strong>Color:</strong> {data.color}</span>
				    </div>
				    <div className="col-lg-4 p-0"><button className="btn btn-primary" onClick={this.addToCart}>Add to Cart</button></div>
				  </div>
				</div>
	}
}

export class WomensApparel extends React.Component{
	constructor(){
		super();
		this.state={
			detailsData:[]
		}
		this.addToCart=this.addToCart.bind(this)
	}
	componentDidMount(){
		axios.get('./db/MOCK_DATA.json')
			 .then((response)=>{
			 	this.setState({
			 		detailsData:response.data
			 	})
			 	
			 })
			 .catch(()=> console.log('Error on Ajax Data'))
	}
	addToCart(){

	}
	render(){
		return 	<div className="col-lg-12 m-0 p-0">
					<h1 className="m-0">Women's Apparel</h1>
					<div className="col-lg-12 p-0 m-0">
						{this.state.detailsData.map(function(data) {
							return(
								<div className="col-lg-3 pl-0" key={data.id} >
									<Products itemsIist={data} />
								</div>
							)
						})
					}
					</div>
				</div>
	}
}