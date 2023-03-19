 Initialize the project (add whatever values as needed):
➢ npm init

 Install the Express module:
➢ npm i express

kill all node server connections:
➢ killall node

find id (PID) of node that is running:

➢ lsof -Pi :{localhostaddress}

kill specific connection

➢ kill {PID}

start server:

➢ npm run dev

for test example

enable authorization:

nano /opt/homebrew/etc/mongod.conf

then:

security
  authorization: enabled


create dbuser

db.createUser({user: "testdbuser", pwd: "Test123!!", roles : [ {role: "dbOwner", db: "testdb"}]});


restart mongo-community:

brew services restart mongodb-community


main admin login :
mongosh --port -u "admin" --authenticationDatabase "admin" -p

then password.

create user for db:

db.createUser({ user: "commerceTestUser", pwd: "GuitAxe123!!!", roles : [ { role: "dbOwner", db: "commerceTest"}]});

db user login:

mongosh --port -u "commerceTestUser" --authenticationDatabase "commerceTest" -p

then password.


----------------------------------------------------------------------------------------------------------------------

Create 