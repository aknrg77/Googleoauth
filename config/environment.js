const development =  {
    name : 'development',
    port : 3000,
    databaseURL :'mongodb://localhost/testAnime',
    google : {
    clientID : process.env.GOOGLE_CILENT_ID,
    clientSecret : process.env.GOOGLE_SECRET_KEY,
    callbackURL : "http://localhost:3000/auth/google/callback"

    }

}
const production = {
    name : 'production',
    port : process.env.PORT,
    databaseURL : `mongodb+srv://anurag:${process.env.MONGO_PASS}@usercluster.l6sr9.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    google : {
        clientID : process.env.GOOGLE_CILENT_ID,
        clientSecret : process.env.GOOGLE_SECRET_KEY,
        callbackURL : "https://google-oauth2.herokuapp.com/auth/google/callback"
        
    
        }

}

module.exports = eval(process.env.PORT)== undefined ? development: production;