var member = {
    get: function() {
        return new Promise(function(resolve, reject) {
            var members = JSON.parse(localStorage.getItem("member")) || [];

            resolve(members);
        });
    },
    find: function(query) {

    },
    add: function(data) {
        return new Promise(function(resolve, reject) {
            if(!data || !data.user || !data.id) {
                return resolve(null);
            }

            member.get().then(function(members) {
                var newMember = {
                    user: data.user,
                    id: data.id
                };

                members.push(newMember);
                member.set(members);

                resolve(newMember);
            });
        });
    },
    set: function(members) {
        return new Promise(function(resolve, reject) {
            localStorage.setItem("member", JSON.stringify(members));

            resolve(members);
        });
    }
};

var board = {
    getAvailableProjects: function(user) {
        return new Promise(function(resolve, reject) {
            member.get().then(function(members) {
                var available = members.filter(function(item) {
                    return item.user === user.email;
                }).map(function(item) {
                    return item.id;
                });

                resolve(available);
            });
        });
    },
    get: function(query) {
        return new Promise(function(resolve, reject) {
            var delay = Math.floor(Math.random() * 999);
            var itemsCatalog = JSON.parse(localStorage.getItem(query.key)) || [];
            var catalog = query.detailsKey ? JSON.parse(localStorage.getItem(query.detailsKey)) : [];

            var details = query.id ? catalog.filter(function(item) { return item.id == query.id; })[0] : null;
            var items = query.projectId ? itemsCatalog.filter(function(item) {
                return item.projectId === query.projectId;
            }) : itemsCatalog.filter(function(item) {
                var match = !query.items || query.items.filter(function(id) {
                        return item.id == id;
                    })[0];

                return match;
            });

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
            if(!data || !data.id) {
                return resolve(null);
            }

            if(params.key === "project" && !data.user ) {
                return resolve(null);
            }

            board.get({key: params.key}).then(function(result) {
                result.items.push(data);
                localStorage.setItem(params.key, JSON.stringify(result.items));

                member.add({
                    user: data.user,
                    id: data.id
                });
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
                    return item.email == query.email;
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
    member: member
};