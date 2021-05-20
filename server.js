// import
var express = require('express') ;
 var bodyParser = require('body-parser')
 var apiRouter = require('./apiRouter').router
 const cors = require('cors')
// instantiate server 
 var server = express();
 server.use(cors())
// body-parser configuration // il nous permet de recuperer les argument et les parametre founir dans le body d'une requete http 
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
 // config router

server.get('/',function(req,res){
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Bonjour sur mon server</h1>');
})
server.post('/',(req,res)=>{
    console.log('hello front')
})

/*  header cors */ 
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
server.use('/api',apiRouter)
// Launch server 
server.listen(8080, function(){
    console.log('serveur en ecoute')
    console.log(`Server is running on http://localhost:${8080}`);
})