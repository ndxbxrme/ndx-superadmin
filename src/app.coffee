'use strict'

module.exports = (ndx) ->
  ndx.database.on 'ready', ->
    ndx.database.select ndx.settings.USER_TABLE,
      email: 'superadmin@admin.com'
    , (users) ->
      if not users.length
        ndx.database.insert ndx.settings.USER_TABLE,
          email: 'superadmin@admin.com'
          local:
            email: 'superadmin@admin.com'
            password: ndx.generateHash 'admin'
          roles:
            superadmin: {}
        , null, true
        console.log 'superuser inserted'
        console.log 'please remember to change the superadmin password'
      else
        if ndx.validPassword 'admin', users[0].local.password
          console.log 'please remember to change the superadmin password'
      