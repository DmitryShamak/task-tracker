function User() {
    var self = this;
    var details = null;
    var extend = function (target, obj) {
        for(var key in obj) {
            target[key] = obj[key];
        }
    };

    //only for testing with localStorage
    self.setSession = function() {
        if(!details) {
            return;
        }

        sessionStorage.setItem("user", JSON.stringify(details));
    };

    self.signIn = function(query) {
        return new Promise(function(resolve, reject) {
            if(details) {
                return resolve(details);
            }

            if(self.api && query) {
                return self.api.find(query).then(function(result) {
                    if(result) {
                        details = result;
                        self.setSession();
                    }

                    resolve(details);
                });
            }

            return resolve(null);
        });
    };
    self.signUp = function(query) {
        return new Promise(function(resolve, reject) {
            if(details) {
                return resolve(details);
            }

            if(!self.api) {
                return resolve(null);
            }

            self.signIn(query).then(function(result) {
                if(result) {
                    details = result;
                    self.setSession();
                    return resolve(result);
                }

                self.api.set(query).then(function(result) {
                    details = result;
                    self.setSession();
                    resolve(result)
                });
            });
        });
    };
    self.signOut = function() {
        details = null;
        sessionStorage.removeItem("user");
    };

    self.get = function() {
        return details;
    };
    self.set = function(data) {
        return new Promise(function(resolve, jeject) {
            if(!self.api) {
                return resolve(null);
            }

            self.api.update({email: details.email}, data).then(function(result) {
                extend(details, result);

                resolve(details);
            });
        });
    };

    self.refresh = function() {
        return new Promise(function(resolve, reject) {
            var session = JSON.parse(sessionStorage.getItem("user"));

            if(!session) {
                return resolve(null);
            }

            self.signIn(session).then(function(result) {
                resolve(result);
            });
        });
    };
}

module.exports = new User();