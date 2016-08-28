#!/bin/bash

(echo -n "{ \"name\":\"Technican\", \"tag\":\"tech\", \"pool\":\""; (openssl base64 < techpool.txt | \
 perl -pe 's/([^a-zA-Z0-9_.!~*()'\''-])/sprintf("%%%02X", ord($1))/ge'); \
 echo "\"}") | \
 curl http://hamexam.herokuapp.com/pools \-H "Content-Type: application/json" --data-binary "@-"
