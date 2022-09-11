# deletedocs

## New test
```
mongo localhost/admin --quiet --eval 'db.shutdownServer();'; rm -rf /Users/pdepretz/0_m/standalone/bulkinsert/* && mlaunch init --single
```

## Bulk insert stats
```
mongo localhost/mydatabase --quiet /Users/pdepretz/4_apps/bulkinsert.js; mongo localhost/mydatabase --quiet --eval 'db.mycollection.stats( { freeStorage: 1, scale: 1024 } )'
mongo localhost/mydatabase --quiet /Users/pdepretz/Documents/git/deletedocs/stats.js
ls -lh data/db/collection-*
```

## Delete stats
```
mongo localhost/mydatabase --eval 'db.mycollection.deleteMany({ "user_id":{$lt:65000}})'
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

## Auto truncation if we delete near the end
```
mongo localhost/mydatabase --quiet --eval 'db.mycollection.deleteMany({ "user_id":{$gt:100000}})'
```