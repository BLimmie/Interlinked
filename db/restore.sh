#!/bin/bash
# gunzip dump.gz
# mv -iT dump data
mongorestore --gzip --archive=dump.gz --db intouch 
