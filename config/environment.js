const development =  {
    name : 'development',
    port : 4000,
    google : {
    clientID : "329217613599-k57k9romf40ta627tgkejp6ou5ndc8d1.apps.googleusercontent.com",
    clientSecret : "7R9kBBBZJ6VStiTANzpYufRp",
    callbackURL : "http://localhost:4000/auth/google/callback"

    }

}
const production = {
    name : 'production',
    port : process.env.PORT,
    google : {
        clientID : "329217613599-k57k9romf40ta627tgkejp6ou5ndc8d1.apps.googleusercontent.com",
        clientSecret : "7R9kBBBZJ6VStiTANzpYufRp",
        callbackURL : "https://google-oauth2.herokuapp.com//auth/google/callback"
    
        }

}

module.exports = eval(process.env.PORT)== undefined ? development: production;