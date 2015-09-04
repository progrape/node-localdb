/**
 * Created by jjf001 on 2015/9/4.
 */

var path = require('path');
var assert = require("assert");
var user = require('..')(path.join(__dirname, 'data/user.json'));

describe('node-localdb', function() {
    describe('#insert()', function () {
        before(function() {
            // remove all data
            user.remove({}).then(function(){});
        });
        after(function() {
            // remove all data
            user.remove({}).then(function(){});
        });


        it('should hash method of #insert()', function(){
            assert.notEqual(undefined, user.insert);
            assert.equal('function', typeof user.insert);
        });
        it('should return object when the there is one user in user document', function (done) {
            user.insert({username: 'jf', password: '123'}).then(function(u){
                assert.notEqual(undefined, u);
                assert.notEqual(undefined, u.username);
                assert.notEqual(undefined, u.password);
                assert.equal('jf', u.username);
                assert.equal('123', u.password);
                assert.notEqual(undefined, u._id);
            }).then(function(){
                user.insert({username: 'xx', password: '321'}).then(function(u){
                    assert.notEqual(undefined, u);
                    assert.notEqual(undefined, u.username);
                    assert.notEqual(undefined, u.password);
                    assert.equal('xx', u.username);
                    assert.equal('321', u.password);
                    assert.notEqual(undefined, u._id);
                });
            }).then(function(){
                user.find({}).then(function(users){
                    assert.notEqual(undefined, users);
                    assert.equal('object', typeof users);
                    assert.equal(true, users instanceof Array);
                    assert.equal(2, users.length);
                    done();
                });
            });
        });
    });
});