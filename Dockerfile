# Build da aplicação React e do servidor HTTP incluído no projeto.
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
# O pnpm usa este patch durante a instalação; ele precisa existir antes do install.
COPY patches ./patches
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build && pnpm prune --prod

# Produção: o servidor Express do projeto entrega dist/public e faz fallback da SPA.
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "dist/index.js"]
