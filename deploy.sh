!/usr/bin/env sh

set -e

git add .
git commit -m "deploy"
git push origin main

npm run build

# copiar CNAME
cp CNAME dist/

cd dist

#git init
git add .
git commit -m 'deploy'

git push -f git@github.com:kenetpicado/ms-rastrear master:gh-pages

cd -