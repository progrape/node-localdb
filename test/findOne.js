/**
 * Created by jjf001 on 2015/9/4.
 */

var path = require('path');
var assert = require("assert");
var user = require('..')(path.join(__dirname, 'data/user.json'));

describe('node-localdb', function() {
    describe('#findOne()', function () {
        before(function() {
            // remove all data
            user.remove({}).then(function(){});
        });
        after(function() {
            // remove all data
            user.remove({}).then(function(){});
        });


        it('should hash method of #findOne()', function(){
            assert.notEqual(undefined, user.findOne);
            assert.equal('function', typeof user.findOne);
        });
        it('should return undefined when the there is no data in user document', function (done) {
            user.findOne({}).then(function(user){
                assert.equal(undefined, user);
                done();
            });
        });
        it('should return an object when there is one object in user document', function(done){
            user.insert({username: 'jf', password: '123'}).then(function(u){
                user.findOne({}).then(function(u){
                    assert.notEqual(undefined, u);
                    assert.notEqual(undefined, u.username);
                    assert.notEqual(undefined, u.password);
                    assert.equal('jf', u.username);
                    assert.equal('123', u.password);
                    assert.notEqual(undefined, u._id);
                });
            }).then(function(){
                user.findOne({username: 'jf'}).then(function(u){
                    assert.notEqual(undefined, u);
                    assert.notEqual(undefined, u.username);
                    assert.notEqual(undefined, u.password);
                    assert.equal('jf', u.username);
                    assert.equal('123', u.password);
                    assert.notEqual(undefined, u._id);
                });
            }).then(function(){
                user.findOne({username: 'xx'}).then(function(u){
                    assert.equal(undefined, u);
                });
                done();
            });
        });
    });
});