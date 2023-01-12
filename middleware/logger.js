function log(req, res, next){
    console.log("Running...");
    next();
}

module.exports = log;