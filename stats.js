var stats = db.mycollection.stats();

var myUri = stats.wiredTiger.uri;

print(myUri)