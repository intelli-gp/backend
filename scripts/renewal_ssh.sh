#!/bin/bash

cd /home/mujedd/codebase/backend/
docker compose run certbot renew
docekr compose kill -s SIGHUP webserver
docker system prune -af
