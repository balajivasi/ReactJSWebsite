
import axios from 'axios'
module.exports={
	login(...args){
		var [UserEmail,UserPassword,cb]=args;

		this.AjaxServiceData(UserEmail,UserPassword,(res)=>{
			if(res.authenticated){
				localStorage.token=[res.finalData,res.finalData.email]
				if(cb)cb(true)
				this.onChange(true)
			}else{
				if(cb)cb(false)
				this.onChange(false)
			}
		})

	},
	logOut(){
		delete localStorage.token
		this.onChange(false)
	},
	logedIn(){
		return !!localStorage.token
	},
	onChange(){},
	AjaxServiceData(...args){
		var [UserEmail,UserPassword,cb]=args;

		setTimeout(()=>{
			if((!localStorage.token) && UserEmail!==undefined && UserPassword!==undefined){
				
				axios.get('./db/users.json')
					 .then((response)=>{

					 	let mainDB = response.data;
					 	var finalData=mainDB.find((data)=>{
					 		return data.email===UserEmail && data.password===UserPassword;
					 	});

					 	if(finalData){
					 		cb({finalData,
					 			authenticated: true
					 		})
					 	}

					 })
					 .catch(()=> console.log('error'))
			}
		},0)
	}
}
