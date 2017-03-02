# ndx-superadmin
### creates a default superadmin user
install with  
`npm install --save ndx-superadmin`  
## what it does  
  makes a user with email `superadmin@admin.com` and password `admin`  
  it will then bug you to change the password until you finally give in and do it
## example  
`src/server/app.coffee`  
```coffeescript
require 'ndx-server'
.config
  database: 'db'
.use ndx-user-roles
.use ndx-superadmin
.start()
```