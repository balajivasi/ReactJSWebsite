import React from 'react';
import {RegisterPage} from './register';
import { hashHistory } from 'react-router';
import auth from './auth'


export class LogoutPageComponent extends React.Component{
	componentDidMount(){
		auth.logOut()
	}
	render(){
		return <h1>You have been loged out </h1>
	}
}

export class LoginPage extends React.Component{
	constructor(props){
		super(props)
		
		this.state={
			location:this.props.location
		}
		this.LoginPageSubmit=this.LoginPageSubmit.bind(this)
	}
	
	componentWillReceiveProps(nextProps){
		this.setState({
			location:nextProps.location
		})
		//console.log(nextProps,nextState)
	}

	LoginPageSubmit(event){
		event.preventDefault();
		let UserEmail=this.refs.emailId.value
		let UserPassword=this.refs.passwordKey.value
		if(UserEmail!=="" && UserPassword!==""){
			auth.login(UserEmail,UserPassword,(logedin)=>{
				const { location } = this.state.location
		        if (location.state && location.state.nextPathname) {
		          hashHistory.push(location.state.nextPathname);
		        } else {
		          hashHistory.push('/')
		        }
			})
			this.setState({
				error:false
			})
		}else{
			this.setState({
				error:true
			})
		}	
	}
	render(){
		return <div className="col-lg-6">
					<h1>Login Page </h1>
					{this.state.error?(<p className="alert alert-danger">Please enter valid email address and password</p>):''}
					<form onSubmit={this.LoginPageSubmit}>
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Email address</label>
					    <input type="email" ref="emailId" className="form-control" id="exampleInputEmail1" placeholder="Please Enter Email Address" />
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputPassword1">Password</label>
					    <input type="password" ref="passwordKey" className="form-control" id="exampleInputPassword1" placeholder="Please Enter Password" />
					  </div>					 
					  <button type="submit" className="btn btn-default">Submit</button>
					</form>
				</div>
	}
}


export class LoginPageComponent extends React.Component{
	render(){
		return 	<div className="col-lg-12">
					<LoginPage location={this.props} />
					<div className="col-lg-6"><RegisterPage /></div>
				</div>
	}
}