# Tarefas — Exportação Git e Netlify

- [x] Verificar a integração GitHub disponível no projeto — integração GitHub existe, mas está desativada nesta sessão.
- [x] Confirmar que o build está configurado para hospedagem estática no Netlify — adicionado `netlify.toml` com `pnpm build`, publicação em `dist/public` e fallback SPA.
- [ ] Salvar um checkpoint final antes da exportação.
- [ ] Orientar a criação do repositório público e a conexão com o Netlify.
- [ ] Alertar sobre a necessidade de substituir o link genérico do WhatsApp antes da publicação.

## Nova etapa — Login e exportação

- [ ] Abrir a autenticação do GitHub no navegador conectado.
- [ ] Aguardar o usuário concluir o login.
- [ ] Exportar o projeto para o repositório Git escolhido.

## Nova etapa — Docker Compose e VPS

- [ ] Ler as orientações de computação persistente e definir o container web.
- [x] Criar Dockerfile multi-stage e docker-compose.yml, além de `docker/nginx.conf`.
- [x] Documentar a publicação em mcinfradashcam.duckdns.org com Nginx Proxy Manager em `DEPLOY-VPS.md`.
- [ ] Validar build e configuração do container na VPS — não foi possível executar Docker no sandbox porque o comando não está instalado; `pnpm check` e `pnpm build` continuam válidos.

## Correção — Build Docker e NPM externo

- [x] Copiar `patches/` antes do `pnpm install` no Dockerfile.
- [x] Remover o Nginx do container da aplicação e servir a build pelo servidor HTTP do projeto.
- [x] Atualizar o encaminhamento do Nginx Proxy Manager para a IP da VM dos projetos.
- [x] Validar novamente o build React e salvar checkpoint corrigido; Docker não está instalado no sandbox para executar o build da imagem.

## Nova etapa — Logo real

- [ ] Copiar a logo enviada para o diretório de assets do projeto.
- [ ] Atualizar a referência da logo em `client/src/pages/Dashcam.tsx`.
- [ ] Atualizar o favicon em `client/index.html`.
- [ ] Validar build, salvar checkpoint e orientar o novo build na VPS.
