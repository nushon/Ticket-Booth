const axios = require('axios').default;


async function createUser(req, res, next) {
    
let admin_obj = {
    name : req.oidc.user.name,
    email : req.oidc.user.email,
    nickname : req.oidc.user.nickname,
    img : req.oidc.user.picture
}
    console.log('Request URL:', req.oidc.user);

    if(admin_obj.email.length > 0){
       let response = await axios.get('http://localhost:3000/admin/' + admin_obj.email)
    
        if(!response.data.email){
           
            await axios.post('http://localhost:3000/admin', admin_obj)
        }else{
            return false;
        }
    }
    next();
  }
  module.exports = {
      createUser
  }