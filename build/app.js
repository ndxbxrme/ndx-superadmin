(function() {
  'use strict';
  module.exports = function(ndx) {
    return ndx.database.on('ready', function() {
      var users;
      users = ndx.database.exec('SELECT * FROM ' + ndx.settings.USER_TABLE + ' WHERE local->email=?', ['superadmin@admin.com']);
      if (!users.length) {
        ndx.database.exec('INSERT INTO users VALUES ?', [
          {
            local: {
              email: 'superadmin@admin.com',
              password: ndx.generateHash('admin')
            },
            roles: {
              superadmin: {}
            }
          }
        ]);
        return console.log('superuser inserted');
      } else {
        if (ndx.validPassword('admin', users[0].local.password)) {
          return console.log('please remember to change the superadmin password');
        }
      }
    });
  };

}).call(this);

//# sourceMappingURL=app.js.map
