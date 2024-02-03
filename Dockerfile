from node:20-bullseye

WORKDIR /app

copy package.json .
copy yarn.lock .
copy .yarnrc.yml .
run yarn install 

env PUBLIC_LISTE1_UID pan7on
env PUBLIC_LISTE2_UID ber7ker

copy . .
run yarn build

ENTRYPOINT [ "node", "./build/index.js" ]
