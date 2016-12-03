import React from 'react'
import axios from 'axios'
import {Link} from 'react-router'

class ListItems extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		let searchDataList=this.props.typeList
		return <Link to={'/searchDetails/'+searchDataList.imdbID} >{searchDataList.Title}</Link>
	}
}


export class SearchPanel extends React.Component{
	
	constructor(props){
		super(props);
		this.state={
			searchData:[]
		}
		this.getSuggestValues=this.getSuggestValues.bind(this)
	}
	getSuggestValues(){
		

		let search=this.refs.searchbox.value
			
			var url=`http://www.omdbapi.com/?s=${search}`
			if(search.length >= 2){
				axios.get(url)
					 .then((response)=>{
					 	this.setState({
					 			searchData: response.data.Search,
					 			typeHeadShow:true
					 		})
					 })
					 .catch((error)=>{
					 	this.setState({
							typeHeadShow:false
						})
					 	console.log(`axios error on auto suggest ${error}`)
					 })
			}else{
				this.setState({
					typeHeadShow:false
				})
			}
			
	}
	render(){
		return <div className="SearchForm text-right">
					<input type="Search" ref="searchbox" placeholder="search" onKeyUp={this.getSuggestValues} className="headerSearchText"/>
					<input value="Search" className="icon-search" type="submit" />
					{this.state.typeHeadShow ? 
						(<ul className="list-group typeSearch text-left">{this.state.searchData.map(function(data){
							return <li className="list-group-item" key={data.imdbID}><ListItems typeList={data} /></li>
							})}
						</ul>) 
						: 
						""
					}
					
			    </div>
	}
}





