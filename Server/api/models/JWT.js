const fs   = require('fs');
const jwt   = require('jsonwebtoken');


var privateKey  = fs.readFileSync('./api/Keys/private.key', 'utf8');
var publicKey  = fs.readFileSync('./api/Keys/public.key', 'utf8');
const tokenValidity = "30d" // 30 days validity






module.exports = {
 sign: (payload, $Options) => {
  var signOptions = {
      issuer:  $Options.issuer,
      subject:  $Options.subject,
      audience:  $Options.audience,
      expiresIn:  tokenValidity,
      algorithm:  "RS256"    
  };
  return jwt.sign(payload, privateKey, signOptions);
}, 
verify: (token, $Option) => {
  var verifyOptions = {
      issuer:  $Option.issuer,
      subject:  $Option.subject,
      audience:  $Option.audience,
      expiresIn:  tokenValidity,
      algorithm:  ["RS256"]
  };
  console.log("verifiying");
   try{
     return jwt.verify(token, publicKey, verifyOptions);
   }catch (err){
     return false;
   }
},
 decode: (token) => {
    return jwt.decode(token, {complete: true});
 }
}