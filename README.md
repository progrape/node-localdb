# node-localdb ![](https://api.travis-ci.org/progrape/node-localdb.svg?branch=master)

a very lightweight local json file database for node.js, just for convenience in development env.

## useage

```
npm install node-localdb --save
```

```javascript
var db = require('node-localdb');
var user = db('path/to/user.json');


// insert
user.insert({username: 'jf', password: '123', email: '123@qq.com'}).then(function(u){
    console.log(u); // print user, with a auto generate uuid
});

// findOne
user.findOne({}).then(function(u){
    console.log(u); // find the first one user
});
user.findOne({username: 'xx'}).then(function(u){
    console.log(u); // undefined, because we don't have a user with username 'xx'
});

// find
user.find({}).then(function(us){
    console.log(us.length); // 1
    console.log(us); // an array with one object
});
user.find({}, {limit: 10, skip: 10 * 2}).then(function(us){
    console.log(us); // for pagination
});

// count
user.count({}).then(function(count){
    console.log(count); // 1
});

// remove
user.remove({username: 'jf'}).then(function(u){
    console.log(u); // the user was remove successfully
});
```

