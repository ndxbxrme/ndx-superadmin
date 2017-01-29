'use strict'

module.exports = (ndx) ->
  ndx.database.on 'ready', ->
    users = ndx.database.exec 'SELECT * FROM ' + ndx.settings.USER_TABLE + ' WHERE local->email=?', ['superadmin@admin.com']
    if not users.length
      ndx.database.exec 'INSERT INTO users VALUES ?', [{
        local:
          email: 'superadmin@admin.com'
          password: ndx.generateHash 'admin'
        roles:
          superadmin: {}
      }]
      console.log 'superuser inserted'
      console.log 'please remember to change the superadmin password'
    else
      if ndx.validPassword 'admin', users[0].local.password
        console.log 'please remember to change the superadmin password'
      