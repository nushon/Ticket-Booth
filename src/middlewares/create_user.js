const axios = require("axios");

//  this is text
async function createUser(req, res, next) {
    
let admin_obj = {
    name : req.oidc.user.name,
    email : req.oidc.user.email,
    nickname : req.oidc.user.nickname,
    img : req.oidc.user.picture
}
    // console.log('Request URL:', admin_obj)

    if(admin_obj.email.length > 0){
       let response = await axios.get('http://localhost:3000/admin/' + admin_obj.email)
        // console.log(response);
    
        if(!response.data.email){
           
            await axios.post('http://localhost:3000/admin', admin_obj)
        }else{
            return false;
        }
    }
    next()
  }


  module.exports = {
      createUser
  }