FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile;

# Build
COPY . .
RUN yarn build

ENV NODE_ENV=production

EXPOSE 3001

CMD ["yarn", "preview"]