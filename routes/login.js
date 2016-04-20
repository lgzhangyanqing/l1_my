var router = require('express').Router();
var dbConn = require('mongodb').MongoClient.connect('mongodb://localhost/test');
var Q = require('q');
router.get('/', function(req, res, next) {
    res.json({
        status: req.session.user != undefined
    });
});
router.post('/', function(req, res, next) {
    var user = req.body;
    dbConn.then(function(db) {
        return db.collection('users').find(user).toArray();
    }).then(function(users) {
        var deferred = Q.defer();
        console.log("session: ", req.session);
        req.session.user = users[0];
        req.session.save(function(err) {
            if (err) deferred.reject(err);
            else deferred.resolve({
                username: user.username
            })
        });
        return deferred.promise;
    }).then(function(info) {
        res.json(info);
    }).catch(function(err) {
        console.log('login err', err);
        next(err);
    })
})
module.exports = router;
