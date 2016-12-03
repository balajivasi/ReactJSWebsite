import React from 'react'
import axios from 'axios'
import {Link} from 'react-router'

class Pagination extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		let totalRecords=this.props.records.totalResults
		let gotopage=this.props.records.pagenumber
		var pagging=[]
		
		if(totalRecords!=""){
			
			if(totalRecords>=1000){
				totalRecords=Math.round(totalRecords/10)
			}else{
				totalRecords=Math.round(totalRecords/10)
			}

			for(var i=1; i <= totalRecords; i++){				
				pagging.push(i)
			}
		}
		
		return 	<nav className="m-0">
  					<ul className="pagination m-0">
  						{
  							pagging.map(function(value){
  								 let activeclass=(gotopage==value) ? "active" : ""
  								 let datalist= <li className={activeclass} key={value}><Link to={'Shoes/page/'+value} >{value}</Link></li>
  								 return datalist
  							})
  						}
  					</ul>
  				</nav>
	}
}

export class Shoes extends React.Component{
	constructor(props){
		super(props)
		this.state={
			shoePageList:[],
			totalResults:1,
			pagenumber:1
		}
		this.dataload=this.dataload.bind(this)
	}
	dataload(meth){
		let pagenumb=this.state.pagenumber;
		let pagenumberload=(this.props.params.value != undefined) ? this.props.params.value : "1"
		let updatednumber = (pagenumb==pagenumberload) ? pagenumb : pagenumberload;
		let PageUrl=`http://www.omdbapi.com/?s=shoes&page=${updatednumber}`
		console.log('dataloaded',meth,PageUrl)

		axios.get(PageUrl)
			 .then((response)=>{
			 	this.setState({
			 		shoePageList:response.data.Search,
			 		totalResults:response.data.totalResults
			 	})
			 })
			 .catch((error)=>{
			 	console.log(`shoePage Data loading issue from Ajax ERROR: ${error}`)
			 })

	}
	componentWillMount(){
		this.setState({
			pagenumber:this.props.params.value
		})
		this.dataload('will');
	}
	componentWillReceiveProps(newProps){
		this.setState({
			pagenumber:newProps.routeParams.value
		})
		this.dataload('componentWillReceiveProps');
	}

	render(){
		return 	<div className="col-lg-12 p-0">
					<div className="col-lg-12 m-0 p-0">
						<div className="col-lg-4 m-0"><h1 className="m-0">Shoes</h1></div>
						<div className="col-lg-8 m-0 text-right"><Pagination records={this.state} /></div>
						<div className="col-lg-12"><strong>Total Records Found : </strong> {this.state.totalResults}</div>
					</div>
					{this.state.shoePageList.map(function(data){
						return <div className="col-lg-3" key={data.imdbID}><ListItems items={data} /></div>
					})}
				</div>
	}
}
class ListItems extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		let ItemList=this.props.items;
		let image=(ItemList.Poster != "N/A") ? ItemList.Poster : "http://placehold.it/200x200"
		return <div className="panel panel-success">
				  <div className="panel-heading">
				    <h3 className="panel-title"><Link to={'Shoes/'+ItemList.imdbID} >{ItemList.Title}</Link></h3>
				  </div>
				  <div className="panel-body">
				     <div className="avatarImg"><img src={image} /></div>
				     <div className="col-lg-7 p-0">
				     		<strong>Year:</strong> {ItemList.Year}
				     </div>
				     <ButtonAddToCart IteamId={ItemList} />
				  </div>
				</div>
	}
}
class ButtonAddToCart extends React.Component{
	constructor(props){
		super(props)
		this.state={
			addtoCartProducts:[]
		}
		this.AddItemToCart=this.AddItemToCart.bind(this)
	}
	AddItemToCart(){
		let productId= this.props.IteamId
		this.setState({
			addtoCartProducts:productId
		})
		
	}
	render(){
		console.log(this.state.addtoCartProducts)
		return <button type="button" className="btn btn-primary" onClick={this.AddItemToCart} >Add To Cart</button>
	}
}







