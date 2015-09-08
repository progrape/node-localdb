/**
 * Created by jjf001 on 2015/9/4.
 */

var path = require('path');
var assert = require("assert");
var user = require('..')(path.join(__dirname, 'data/user.json'));

describe('node-localdb', function() {
    describe('#find()', function () {
        before(function() {
            // remove all data
            user.remove({}).then(function(){});
        });
        after(function() {
            // remove all data
            user.remove({}).then(function(){});
        });


        it('should hash method of #find()', function(){
            assert.notEqual(undefined, user.find);
            assert.equal('function', typeof user.find);
        });
        it('should return undefined when the there is no data in user document', function (done) {
            user.find({}).then(function(users){
                assert.notEqual(undefined, users);
                assert.equal('object', typeof users);
                assert.equal(true, users instanceof Array);
                assert.equal(0, users.length);
                done();
            });
        });
        it('should return an object when there is one object in user document', function(done){
            user.insert({username: 'jf', password: '123'}).then(function(u){
                user.find({}).then(function(users){
                    assert.notEqual(undefined, users);
                    assert.equal('object', typeof users);
                    assert.equal(true, users instanceof Array);
                    assert.equal(1, users.length);
                    var u = users[0];
                    assert.notEqual(undefined, u);
                    assert.notEqual(undefined, u.username);
                    assert.notEqual(undefined, u.password);
                    assert.equal('jf', u.username);
                    assert.equal('123', u.password);
                    assert.notEqual(undefined, u._id);
                    done();
                });
            });
        });

        it('should return 2 object when there is 2 object in user document', function(done){
            user.insert({username: 'jf', password: '123'}).then(function(u){
                user.find({}).then(function(users){
                    assert.notEqual(undefined, users);
                    assert.equal('object', typeof users);
                    assert.equal(true, users instanceof Array);
                    assert.equal(2, users.length);
                    done();
                });
            });
        });

        it('should return 1 object when there is pagination size is 1', function (done){
            user.find({}, {
                limit: 1,
                skip: 0
            }).then(function (us){
                assert.notEqual(undefined, us);
                assert.equal('object', typeof us);
                assert.equal(true, us instanceof Array);
                assert.equal(1, us.length);
                done();
            });
        });

        it('should return 2 object when there is pagination size is 2', function (done){
            user.find({}, {
                limit: 2,
                skip: 0
            }).then(function (us){
                assert.notEqual(undefined, us);
                assert.equal('object', typeof us);
                assert.equal(true, us instanceof Array);
                assert.equal(2, us.length);
                done();
            });
        });
    });
});