var board = {
    get: function(params) {
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
    },
    getTicket: function(params) {
        return new Promise(function(resolve, reject) {
            board.get(params).then(function(data) {
                resolve(data.filter(function(item) {
                    return item.id == params.id;
                })[0])
            });
        });
    },
    add: function(params, data) {
        return new Promise(function(resolve, reject) {
            board.get({key: params.key}).then(function(result) {
                result.push(data);
                localStorage.setItem(params.key, JSON.stringify(result));

                resolve(data);
            });
        });
    },
    remove: function(params) {},
    update: function(params, data) {
        return new Promise(function(resolve, reject) {
            utils.get(params).then(function(result) {
                var target = result.filter(function(item) {
                    return item.id == data.id;
                })[0];

                if(target) {
                    target = $.extend(target, data);
                    localStorage.setItem(params.key, JSON.stringify(result));

                    return resolve(target);
                }

                reject("error");
            });
        });
    }
};

var user = {
    set: function(data) {
        return new Promise(function(resolve, reject) {
            user.get().then(function(users) {
                users.push(data);

                localStorage.setItem("user", JSON.stringify(users));

                resolve(data);
            });
        });
    },
    get: function() {
        return new Promise(function(resolve, reject) {
            var delay = Math.floor(Math.random() * 999);
            var result = JSON.parse(localStorage.getItem("user")) || [];

            setTimeout(function() {
                resolve(result);
            }, delay);
        });
    },
    find: function(query) {
        return new Promise(function(resolve, reject) {
            user.get().then(function(result) {
                var target = result.filter(function(item) {
                    var emailMatch = item.email == query.email;
                    var passwordMatch = item.password == query.password;

                    return emailMatch && passwordMatch;
                })[0];

                if(target) {
                    return resolve(target);
                }

                resolve(null, "error");
            });
        });
    },
    update: function(query, data) {
        return new Promise(function(resolve, reject) {
            user.get().then(function(result) {
                var target = result.filter(function(item) {
                    return item.id == query.id;
                })[0];

                if(target) {
                    target = $.extend(target, data);
                    localStorage.setItem("user", JSON.stringify(result));

                    return resolve(target);
                }

                reject(null, "error");
            });
        });
    }
};
module.exports = {
    board: board,
    user: user
};