import React from 'react'

export class RegisterPage extends React.Component{
	render(){
		return 	<div>
				  <h1>Register</h1>
				  <div className="form-group">
				    <label htmlFor="exampleInputName2">Name</label>
				    <input type="text" className="form-control" id="exampleInputName2" placeholder="Please Enter Name" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="inputEmail3">Email</label>
				      <input type="email" className="form-control" id="inputEmail3" placeholder="Please Enter Email Address" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="inputPassword3">Password</label>
				      <input type="password" className="form-control" id="inputPassword3" placeholder="Please Enter Password" />
				  </div>				  
				  <div className="form-group">
				      <button type="submit" className="btn btn-default">Register</button>
				  </div>
				</div>
	}
}