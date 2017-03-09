(function() {
  'use strict';
  module.exports = function(ndx) {
    return ndx.database.on('ready', function() {
      return ndx.database.select(ndx.settings.USER_TABLE, {
        local: {
          email: 'superadmin@admin.com'
        }
      }, function(users) {
        if (!users.length) {
          ndx.database.insert(ndx.settings.USER_TABLE, {
            local: {
              email: 'superadmin@admin.com',
              password: ndx.generateHash('admin')
            },
            roles: {
              superadmin: {}
            }
          }, null, true);
          console.log('superuser inserted');
          return console.log('please remember to change the superadmin password');
        } else {
          if (ndx.validPassword('admin', users[0].local.password)) {
            return console.log('please remember to change the superadmin password');
          }
        }
      });
    });
  };

}).call(this);

//# sourceMappingURL=app.js.map
