function Participant() {
    var self = this;
    var users = null;

    self.get = function(query) {
        return new Promise(function(resolve, jeject) {
            if(users) {
               return resolve(users);
            }

            if(!self.api) {
                return resolve([]);
            }

            self.api.get(query).then(function(result) {
                if(!users) {
                    users = [];
                }
                if(result) {
                    users = result;
                }

                resolve(users);
            });
        });
    };
    self.add = function(user) {
        return new Promise(function(resolve, jeject) {
            if(!self.api) {
                return resolve(null);
            }

            self.api.add(user).then(function(result) {
                if(!users) {
                    users = [];
                }
                if(result) {
                    users.push(result);
                }

                resolve(users);
            });
        });
    };

    self.remove = function(user) {
        return new Promise(function(resolve, reject) {
            if(!self.api) {
                return resolve(null);
            }

            self.api.remove(user).then(function(result) {
                resolve(result);
            });
        });
    };
}

module.exports = new Participant();