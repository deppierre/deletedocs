# deletedocs

## New test
```
mongo localhost/admin --eval 'db.shutdownServer();'; rm -rf /Users/pdepretz/0_m/standalone/bulkinsert/* && mlaunch init --single
```

## Bulk insert stats
```
mongo localhost/mydatabase /Users/pdepretz/4_apps/bulkinsert.js
mongo localhost/mydatabase --eval 'db.mycollection.stats( { freeStorage: 1, scale: 1024 } )'
```

## Delete stats
```
mongo localhost/mydatabase --eval 'db.mycollection.deleteMany({ "user_id":{$lt:100000}})'
```

## WiredTiger
```
db.mycollection.stats().wiredTiger
mongo localhost/mydatabase db.mycollection.stats().block-manager
```

## Compact
```
localhost/mydatabase --eval 'db.runCommand({compact: "mycollection",force:true})'
mongo localhost/mydatabase --eval "db.mycollection.deleteMany({})"
```