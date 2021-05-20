
// import
var nodemailer = require('nodemailer');

var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils')
var models = require('../models');
var asyncLib = require('async')
// constant 
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$;/

// Routes 
module.exports = {
register: function(req,res){
// Params
console.log(req.body)
var email = req.body.email;
//var username = req.body.username;
var password='123';
var role = req.body.role;
var tel = req.body.tel
var naissance = req.body.naissance
var Prenom = req.body.Prenom
var Nom = req.body.Nom
if(email == null  || password == null){
    return res.status(400).json({'error':'paramètres manquants'})
}
/* if(username.lenght >= 13 || username.length <= 4 ){
    return res.status(400).json({'error':'username doit etre compris entre 4 et 13 '})
} */
// TODO vérifier la pseudo longueur, regex de messagerie, mot de passe ect

 models.User.findOne({
    atttibutes: ['email'],
    where: {email:email }
})
.then(function(userFound){
if (!userFound){
    if(!EMAIL_REGEX.test(email)){
        return res.status(400).json({'error':'email non valide'})
    } 

 /* if(!PASSWORD_REGEX.test(password)){
    return res.status(400).json({'error':'passoword compris entre 4 et 8'})
    }  */
    sendMail(email, password)
bcrypt.hash(password,5,function(err , bcryptedPassword){
   // nouvel utilisateur
   var newUser = models.User.create({
       email:email,
       //username:username,
       password: bcryptedPassword,
       role:role,
       tel:tel,
     naissance:naissance,
     Prenom:Prenom,
     Nom:Nom,
       isAdmin:0
   }).then(function(newUser){
       return res.status(201).json({
         //userId:newUser.id  
         newUser
       })
   })
   .catch(function(err){
       return res.status(500).json({'error': 'impossible ajouter un utilisateur'})
   })
})
}else{
    return res.status(409).json({'error':'utilisateur existe deja'});
}
})
.catch(function(err){
 return res.status(500).json({'error':'impossible de vérifier utilisateur'})   
}) 
},
login: function(req,res){
// params
var data = req.body;
const {email, password}=data
console.log(data)
//var username = req.body.username;

if(email== null || password== null){
  return res.status(400).json({'error':'missing parameters'})
} 
// controle si des caracters si utilisateur entre un seul caracter ou n'importe quoi bloquez

// ToDO verify mail regex & password length
models.User.findOne({
    where:{email:email}
})
.then(function(userFound){
if(userFound){
bcrypt.compare(password,userFound.password,function(errBycrypt,resBycrypt){
 if(resBycrypt){
    models.User.findAll().then(function(tasks){
        console.log(tasks);
        let userInfo ={
            'userId':userFound.id,
            'role':userFound.role,
             'prenom':userFound.Prenom,
            'nom':userFound.Nom,
            'token':jwtUtils.generateTokenForUser(userFound),
        }
        return res.status(200).json({userInfo,tasks});
    })
    
 }else{
     return res.status(403).json({"error":"invalid password"})
 }
})

}else{
    return res.status(404).json({'error':'user not exist in DB'})
}
})
.catch(function(err){
    return res.status(500).json({'error':'unable to verify user'})
})
},
// get profile

list:function(req,res){
    console.log('test')
    models.User.findAll().then(function(tasks){
        console.log(tasks);
        return res.status(200).json(tasks);
    })
},

getUserProfile:function(req,res){
// Getting auth header
userId = req.body.value;
console.log(req.body)
models.User.findOne({
    where: {id: userId }

}).then(function(user){
    return res.status(200).json({
        'userId':user.id,
        'role':user.role,
         'prenom':user.Prenom,
        'nom':user.Nom,
    });
})
},


// modifier un utilisateur 
updateUserProfile: function(req, res){
    //Getting auth header
    var headerAuth = req.header['authorization']
    var userId = jwtUtils.getUserId(headerAuth)
// Params

var email = req.body.email
//var username = req.body.username
var password = req.body.password
var role = req.body.role;
asyncLib.waterfall([
    function(done){ 
models.User.findOne({
    attributes:['id','username','email','password','role'],
    where: {id: userId }
}).then(function(userFound){
    done(null,userFound)
})
.catch(function(err){
    return res.status(500).json({'error':'unable to verify user'})
})
},
function(userFound,done){
    if(userFound){
        userFound.update({
            email: (email ? email : userFound.email),
            password: (password ? password : userFound.password),
           // username: (username ? username: userFound.username) ,
            role: (role? role: userFound.role) 
        }).then(function(){
            done(userFound)
        }).catch(function(err){
            res.status(500).json({'error':'cannot update user'})
        })
    }else{
        res.status(404).json({'error':'user not fount'})
    }
},
],function(userFound){
    if(userFound){
        return res.status(201).json(userFound)

    }else {
        return res.status(500).json({'error':'cannot update user profile'})
    }
})

},

}

//Envoie du mot de passe par mail
sendMail = (email, password)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
          user: process.env.ACCOUNT,
          pass: process.env.PASSWORD
        }
      });
      
      const options = {
        from:"mamemorthiampo@gmail.com",
        to:"babacacthiam@gmail.com",
        subject: email,
        text:`pass:${password}`,
        password:"Seneg@l60"
      }
      
      transporter.sendMail(options,  function(err,info){
        
      if(err){
        console.log(err);
        return;
      }
      
      console.log( "Sent:" + info.response);
      }) 
      
}


