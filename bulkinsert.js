// mongo localhost/admin --eval 'db.shutdownServer();'; rm -rf /Users/pdepretz/0_m/standalone/bulkinsert/* && mlaunch init --single
//1. mongo localhost/mydatabase /Users/pdepretz/4_apps/bulkinsert.js
//3. mongo localhost/mydatabase --eval 'db.mycollection.stats( { freeStorage: 1, scale: 1024 } )'
//2. mongo localhost/mydatabase --eval 'db.mycollection.deleteMany({ "user_id":{$lt:100000}})'
//3. mongo localhost/mydatabase --eval 'db.mycollection.stats( { freeStorage: 1, scale: 1024 } )'
//3. mongo localhost/mydatabase db.mycollection.stats().block-manager
//db.mycollection.stats().wiredTiger
//3. Compact mongo localhost/mydatabase --eval 'db.runCommand({compact: "mycollection",force:true})'
//2. Delete mongo localhost/mydatabase --eval "db.mycollection.deleteMany({})"

function SampleData(myBulk){
	people = ["Marc", "Bill", "George", "Eliot", "Matt", "Trey", "Tracy", "Greg", "Steve", "Kristina", "Katie", "Jeff"];
 
	for(var i=0; i<130000; i++){
		user_id = i;
		n = people[Math.floor(Math.random()*people.length)];
		number = Math.floor(Math.random()*10001);
		myBulk.insert( { "user_id":user_id, "name":n, "number":number });
	}
}

//Insert in collectionDelete
db.mycollection.drop();
var myBulk = db.mycollection.initializeUnorderedBulkOp();
SampleData(myBulk)
myBulk.execute();

//Indexes creation
db.mycollection.createIndex({user_id:1});

/*
-rw-------  1 pdepretz  staff   2.8M 23 Aug 16:58 collection-11--6826627282363647811.wt
-rw-------  1 pdepretz  staff   3.2M 23 Aug 16:59 collection-11--6826627282363647811.wt
-rw-------  1 pdepretz  staff    12K 23 Aug 17:03 collection-11--6826627282363647811.wt
*/

//we add a bunch of metadata 
//Conclusion
//a delete is more expansive than a write: (we need to write more pages) which has two impacts on disk:
//-takes more storage space
//-more disk usage (IOPS, longer util, ...)
//a file will be truncated:
//  automatically when we delete the last blocks of a file
//  through the compact command because it will optimise the file to create empty blocks at the end