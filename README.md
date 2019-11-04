# intouch-health-interlinked-2019

### Dependencies:

    go get -u github.com/gin-gonic/gin

## Code Layout

The directory structure of a generated Revel application:

    app/              Application Directory
        auth.go       Go file for authentication

    db/               Database file Directory
        start_db.sh   Start database script

    routes/           Router Directory
        routes.go     Routes for endpoints in the API


### Database
Must start db before saving / restoring db. Be careful of overwriting your data in db/data.  
`notes/dbdesign.txt` contains queries and schema concepts for db  
`db/main.go` contains queries translated for use in go
`go get go.mongodb.org/mongo-driver` to connect to mongodb from go   
```  
	source env.sh  
	cd db 
	./restore.sh 
	./start_db.sh 
	./store.sh 
```  
restore.sh: restore db from dump.gz  
store.sh: save db to dump.gz  
