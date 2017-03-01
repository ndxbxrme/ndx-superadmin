(function() {
  'use strict';
  module.exports = function(ndx) {
    return ndx.database.on('ready', function() {
      var users;
      users = ndx.database.select(ndx.settings.USER_TABLE, {
        local: {
          email: 'superadmin@admin.com'
        }
      });
      if (!users.length) {
        ndx.database.insert(ndx.settings.USER_TABLE, {
          local: {
            email: 'superadmin@admin.com',
            password: ndx.generateHash('admin')
          },
          roles: {
            superadmin: {}
          }
        });
        console.log('superuser inserted');
        return console.log('please remember to change the superadmin password');
      } else {
        if (ndx.validPassword('admin', users[0].local.password)) {
          return console.log('please remember to change the superadmin password');
        }
      }
    });
  };

}).call(this);

//# sourceMappingURL=app.js.map
