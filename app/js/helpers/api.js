var board = {
    get: function(params) {
        return new Promise(function(resolve, reject) {
            var delay = Math.floor(Math.random() * 999);
            var itemsCatalog = JSON.parse(localStorage.getItem(params.key)) || [];
            var catalog = params.detailsKey ? JSON.parse(localStorage.getItem(params.detailsKey)) : [];

            var details = params.id ? catalog.filter(function(item) { return item.id == params.id; })[0] : null;
            var items = params.projectId ? itemsCatalog.filter(function(item) {
                return item.projectId === params.projectId;
            }) : itemsCatalog;

            setTimeout(function() {
                resolve({
                    details: details,
                    items: items
                });
            }, delay);
        });
    },
    getTicket: function(params) {
        return new Promise(function(resolve, reject) {
            board.get(params).then(function(data) {
                resolve(data.items.filter(function(item) {
                    return item.id == params.id;
                })[0])
            });
        });
    },
    add: function(params, data) {
        return new Promise(function(resolve, reject) {
            board.get({key: params.key}).then(function(result) {
                result.items.push(data);
                localStorage.setItem(params.key, JSON.stringify(result.items));

                resolve(data);
            });
        });
    },
    remove: function(params) {},
    update: function(params, data) {
        return new Promise(function(resolve, reject) {
            board.get(params).then(function(result) {
                var target = result.items.filter(function(item) {
                    return item.id == data.id;
                })[0];

                if(target) {
                    target = $.extend(target, data);
                    localStorage.setItem(params.key, JSON.stringify(result.items));

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

var participant = {
    get: function() {
        return new Promise(function(resolve, reject) {
            reject(null);
        });
    },
    add: function() {
        return new Promise(function(resolve, reject) {
            reject(null);
        });
    },
    remove: function() {
        return new Promise(function(resolve, reject) {
            reject(null);
        });
    }
};

module.exports = {
    board: board,
    user: user,
    participant: participant
};