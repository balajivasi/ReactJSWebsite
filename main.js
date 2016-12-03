import React from 'react';
import {render} from 'react-dom';
import {hashHistory, Router, Route, Link, IndexRoute} from 'react-router';
import auth from './app/auth';
import {LoginPageComponent,LogoutPageComponent} from  './app/loginScreen'

import {AppComponent,Designers,Handbags,Accessories,Beauty,TheMansStore,NMKids,Gifts,Sale} from './app/pages';

import {SearchPanel} from './app/searchPanel'
import {Shoes} from './app/shoes'
import {PageDetails} from './app/pageDetails'
import {WomensApparel} from './app/womensApparel'

export class NavigationLinks extends React.Component{
	render(){
		return 	<nav className="navbar">
					<ul className="nav nav-pills">
						<li><Link to="/Designers" activeClassName="active">Designers</Link></li>
						<li><Link to="/WomensApparel" activeClassName="active">Women's Apparel</Link></li>
						<li><Link to="/Shoes" activeClassName="active">Shoes</Link></li>
						<li><Link to="/Handbags" activeClassName="active">Handbags</Link></li>
						<li><Link to="/Accessories" activeClassName="active">Accessories</Link></li>
						<li><Link to="/Beauty" activeClassName="active">Beauty</Link></li>
						<li><Link to="/TheMansStore" activeClassName="active">The Man's Store</Link></li>
						<li><Link to="/NMKids" activeClassName="active">NM Kids</Link></li>
						<li><Link to="/Gifts" activeClassName="active">Gifts</Link></li>
						<li><Link to="/Sale" activeClassName="active">Sale</Link></li>
					</ul>
				</nav>
	}
}

class HeaderPanel extends React.Component{
	render(){
		return <div className="col-lg-12 p-0">
				<div className="Logo col-lg-5 p-0 mt-20"><Link to="/"><img src="images/balajivasi.png" /></Link></div>
				<div className="col-lg-6 p-0 pullright">
					<HeaderRightNavPanel />
					<SearchPanel />
				</div>
			   </div>
	}
}

class FooterCopyRights extends React.Component{
	render(){
		return <footer className="copyright">
				<a href="#" target="_parent">© 2016, Balaji Vasi</a>&nbsp;|
    			<a href="#" target="_parent">
	        		<span>Terms &amp; Conditions and Privacy Policy</span>
	        		<span>Site Terms and Privacy</span>
          		</a>
          | 	<a href="#" target="_parent">Sitemap</a>
			   </footer>
	}
}
class HeaderRightNavPanel extends React.Component{
	constructor(){
		super();
		this.state={
			loggedIn:auth.logedIn()
		}
		this.updateLoginStatus=this.updateLoginStatus.bind(this)
	}
	updateLoginStatus(loggedIn){
		this.setState({
			loggedIn
		})
	}
	componentWillMount(){
		auth.onChange=this.updateLoginStatus
		auth.login();
	}
	render(){
		return <ul className="TopNavigation"> 
					<li>
				        <Link to="">
				            <img alt="India" className="icon-flag" src="images/us.gif" />
				            <span> Change </span>
				        </Link>
				    </li>
				    <li>
				    	{this.state.loggedIn ?
				    		(<Link to="logOut" activeClassName="active">LogOut</Link>)
				    		:
				    		(<Link to="login" activeClassName="active">Sign In / Register</Link>)
				    	}
				    </li>
				    <li><Link to="">NEED HELP?</Link></li>	
				    <li className="ShoppingBag"><Link to="">Shopping Bag</Link></li>		
				</ul>
	}
}

class MainPanel extends React.Component{
	render(){
		return <div className="row m-0">
					<HeaderPanel />
					<div className="col-lg-12 p-0"><NavigationLinks /></div>
				 	{this.props.children}
				 	<FooterCopyRights />				 	
			   </div>
	}
}


function RequiredLogin(nextState,replace){
	if(!auth.logedIn()){
		replace({
			pathname:'login',
			state:{nextPathname:nextState.location.pathname}
		})
	}
}

class MainNavigation extends React.Component{
	render(){
		return <Router history={hashHistory}>
					<Route path="/" component={MainPanel}>
						<IndexRoute component={AppComponent} />
						<Route path="Designers" component={Designers} />
						<Route path="WomensApparel" component={WomensApparel} onEnter={RequiredLogin} />
						<Route path="Shoes" onEnter={RequiredLogin}>
							<IndexRoute component={Shoes} />
							<Route path=":imdbID" component={PageDetails} />
							<Route path="page/:value" component={Shoes} />
						</Route>
						<Route path="login" component={LoginPageComponent} />
						<Route path="logOut" component={LogoutPageComponent} />
						<Route path="Handbags" component={Handbags} />
						<Route path="Accessories" component={Accessories} />
						<Route path="TheMansStore" component={TheMansStore} />
						<Route path="Beauty" component={Beauty} />
						<Route path="NMKids" component={NMKids} />
						<Route path="Gifts" component={Gifts} />
						<Route path="Sale" component={Sale} />
						<Route path="searchDetails/:imdbID" component={PageDetails} />
						<Route path="**" component={AppComponent} />

					</Route>
			</Router>
	}
}


render(<MainNavigation />, MySri);