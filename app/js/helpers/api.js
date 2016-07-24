var utils = {};

utils.get = function(params) {
    return new Promise(function(resolve, reject) {
        var delay = Math.floor(Math.random() * 999);
        var result = JSON.parse(localStorage.getItem(params.key)) || [];

        setTimeout(function() {
            if(params.projectId) {
                resolve(result.filter(function(item) {
                    return item.projectId === params.projectId;
                }));
            } else {
                resolve(result);
            }
        }, delay);
    });
};
utils.getTicket = function(params) {
    return new Promise(function(resolve, reject) {
        utils.get(params).then(function(data) {
            resolve(data.filter(function(item) {
                return item.id == params.id;
            })[0])
        });
    });
};
utils.add = function(params, data) {
    return new Promise(function(resolve, reject) {
        utils.get({key: params.key}).then(function(result) {
            result.push(data);
            localStorage.setItem(params.key, JSON.stringify(result));

            resolve(data);
        });
    });
};


utils.remove = function(params) {};
utils.update = function(params, data) {
    return new Promise(function(resolve, reject) {
        resolve(data);
    });
};

module.exports = utils;