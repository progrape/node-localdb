/**
 * Created by jjf001 on 2015/9/4.
 */

var path = require('path');
var assert = require("assert");
var user = require('..')(path.join(__dirname, 'data/user.json'));

describe('node-localdb', function() {
    describe('#remove()', function () {
        before(function() {
            // remove all data
            user.remove({}).then(function(){});
        });
        after(function() {
            // remove all data
            user.remove({}).then(function(){});
        });


        it('should hash method of #remove()', function(){
            assert.notEqual(undefined, user.remove);
            assert.equal('function', typeof user.remove);
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
                user.remove({username: 'jf'});
            }).then(function(){
                user.findOne({}).then(function(u){
                    assert.equal(undefined, u);
                    done();
                });
            });
        });
    });
});