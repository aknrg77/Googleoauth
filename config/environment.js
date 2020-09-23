const development =  {
    name : 'development',
    port : 3000,
    databaseURL :"mongodb://localhost/userLogin",
    google : {
    clientID : process.env.GOOGLE_CILENT_ID,
    clientSecret : process.env.GOOGLE_SECRET_KEY,
    callbackURL : "http://localhost:4000/auth/google/callback"

    }

}
const production = {
    name : 'production',
    port : process.env.PORT,
    databaseURL : "mongodb+srv://dbUser:dbUser@logincluster.l6sr9.mongodb.net/<dbname>?retryWrites=true&w=majority",
    google : {
        clientID : "329217613599-k57k9romf40ta627tgkejp6ou5ndc8d1.apps.googleusercontent.com",
        clientSecret : "7R9kBBBZJ6VStiTANzpYufRp",
        callbackURL : "https://google-oauth2.herokuapp.com/auth/google/callback"
        
    
        }

}

module.exports = eval(process.env.PORT)== undefined ? development: production;