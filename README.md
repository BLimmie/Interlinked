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
`source env.sh`  
`cd db` 
`./start_db.sh`  
`./restore.sh` to restore db from dump.gz
`./store.sh` to save db
