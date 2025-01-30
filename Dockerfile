# ==================== #
#        BUILDER      #
# ==================== #
FROM node:23-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build


# ==================== #
#      LISTOPHONE      #
# ==================== #
FROM node:23-alpine AS listophone

WORKDIR /app

COPY yarn.lock /app/
COPY .yarnrc.yml /app/
COPY .yarn/ /app/.yarn/
COPY package.json /app/

COPY --from=builder /app/build /app

RUN yarn workspaces focus --all --production

EXPOSE 3000
CMD ["node", "./index.js"]