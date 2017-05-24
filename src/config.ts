export default {
    useHttps: false,
    debug: false,
    port: process.env.PORT || 3000,
    secret: 'gustayooo',
    db:{
        uri: process.env.MONGO_URL || 'mongodb://127.0.0.1/mymongotypescript',
        options:{
            db:{
                native_parser: true
            },
            server:{
                poolSize: 5
            }
        }
    }
}
