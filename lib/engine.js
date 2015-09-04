/**
 * Created by jfengjiang on 2015/8/25.
 */

var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');
var _ = require('lodash');
var Promise = require('bluebird');


module.exports = Engine;

/**
 * engine
 * @param filename
 * @constructor
 */
function Engine(filename){
    if(!(this instanceof Engine)){
        return new Engine(filename);
    }
    mkdir(path.dirname(filename));
    if(!fs.existsSync(filename)){
        fs.writeFileSync(filename, '[]', {encoding: 'utf8'});
    }

    this.path = filename;
}

/**
 * findOne
 * @param option condition
 * @returns {*}
 */
Engine.prototype.findOne = function (option){
    option = _.merge(option, {});
    var data = this._fetch();
    return new Promise(function (resolve, reject){
        resolve(_.find(data, option));
    });
};

/**
 * find
 * @param option
 * @returns {bluebird|exports|module.exports}
 */
Engine.prototype.find = function (option){
    option = _.merge(option, {});
    var data = this._fetch();
    return new Promise(function (resolve, reject){
        resolve(_.filter(data, option));
    });
};

/**
 * count
 * @param option
 * @returns {*}
 */
Engine.prototype.count = function (option){
    option = _.merge(option, {});
    return this.find(option).then(function (data){
        return data.length;
    });
};

/**
 * update
 * @param option
 * @param obj
 * @returns {bluebird|exports|module.exports}
 */
Engine.prototype.update = function (option, obj){
    option = _.merge(option, {});
    var self = this;
    var data = this._fetch();
    return new Promise(function (resolve, reject){
        var targets = _.filter(data, option);
        var result = [];
        _.forEach(targets, function (target){
            var index = _.indexOf(data, target);
            // TODO merge
            var newObj = obj;
            result.push(newObj);
            data.splice(index, 1, newObj);
        });
        self._flush(data);
        resolve(result);
    });
};

/**
 * insert obj
 * @param obj
 */
Engine.prototype.insert = function (obj){
    obj = _.merge(obj, {_id: uuid.v4()});
    var data = this._fetch();
    data.push(obj);
    this._flush(data);
    return new Promise(function (resolve, reject){
        resolve(obj);
    });
};

/**
 * remove
 * @param option
 * @returns {bluebird|exports|module.exports}
 */
Engine.prototype.remove = function (option){
    option = _.merge(option, {});
    var data = this._fetch();
    var targets = _.remove(data, option);
    this._flush(data);
    return new Promise(function (resolve, reject){
        resolve(targets);
    });
};

/**
 * fetch data from local file
 * @private
 */
Engine.prototype._fetch = function (){
    var json = fs.readFileSync(this.path, 'utf8');
    return JSON.parse(json);
};

/**
 * write data to local file
 * @param data
 * @private
 */
Engine.prototype._flush = function (data){
    fs.writeFileSync(this.path, JSON.stringify(data));
};


/**
 * mkdir recursive
 * @param dir
 * @param mode
 * @private
 */
function mkdir(dir, mode){
    try{
        fs.mkdirSync(dir, mode);
    }
    catch(e){
        if(e.errno === 34){
            this._mkdir(path.dirname(dir), mode);
            this._mkdir(dir, mode);
        }
    }
}