const development =  {
    name : 'development',
    port : 4000,
    google : {
    clientID : process.env.GOOGLE_CILENT_ID,
    clientSecret : process.env.GOOGLE_SECRET_KEY,
    callbackURL : "http://localhost:4000/auth/google/callback"

    }

}
const production = {
    name : 'production',
    port : process.env.PORT,
    google : {
        clientID : process.env.GOOGLE_CILENT_ID,
        clientSecret : process.env.GOOGLE_SECRET_KEY,
        callbackURL : "https://google-oauth2.herokuapp.com/auth/google/callback"
        
    
        }

}

module.exports = eval(process.env.PORT)== undefined ? development: production;