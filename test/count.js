/**
 * Created by jjf001 on 2015/9/4.
 */

var path = require('path');
var assert = require("assert");
var user = require('..')(path.join(__dirname, 'data/user.json'));

describe('node-localdb', function() {
    describe('#count()', function () {
        before(function() {
            // remove all data
            user.remove({}).then(function(){});
        });
        after(function() {
            // remove all data
            user.remove({}).then(function(){});
        });


        it('should hash method of #count()', function(){
            assert.notEqual(undefined, user.count);
            assert.equal('function', typeof user.count);
        });
        it('should return 0 when the there is no match data in user document', function (done) {
            user.count({}).then(function(count){
                assert.equal(0, count);
                done();
            });
        });
        it('should return an object when there is one match object in user document', function(done){
            user.insert({username: 'jf', password: '123'}).then(function(u){
                user.count({}).then(function(count){
                    assert.equal(1, count);
                    done();
                });
            });
        });

        it('should return 2 object when there is 2 match object in user document', function(done){
            user.insert({username: 'jf', password: '123'}).then(function(u){
                user.count({}).then(function(count){
                    assert.equal(2, count);
                    done();
                });
            });
        });
    });
});