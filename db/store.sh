#!/bin/bash
mongodump --db intouch --gzip --archive > dump_`date +"%Y-%m-%d"`.gz
cp dump_`date +"%Y-%m-%d"`.gz dump.gz
