# Implantação na VPS — MC Infra TI Dash Cam

## Arquitetura

O projeto é uma SPA React compilada em uma imagem multi-stage. A etapa Node gera `dist/public`; a etapa final usa Nginx Alpine para servir os arquivos estáticos, aplicar fallback para as rotas `/` e `/dashcam`, habilitar gzip e adicionar cabeçalhos básicos de segurança. O Compose publica o container somente em `127.0.0.1:8088`, deixando o Nginx Proxy Manager responsável pelo acesso externo e pelo TLS.

## 1. Baixar o projeto

Na VPS, execute:

```bash
git clone https://github.com/amdremessias/mcinfra-dashcam.git
cd mcinfra-dashcam
```

## 2. Subir o container

```bash
docker compose up -d --build
docker compose ps
curl -I http://127.0.0.1:8088/
```

O retorno do `curl` deve apresentar status `200`. Para acompanhar a aplicação:

```bash
docker compose logs -f --tail=100
```

Para atualizar depois de novos commits:

```bash
git pull
docker compose up -d --build
```

## 3. Criar o Proxy Host no Nginx Proxy Manager

No Nginx Proxy Manager, crie um novo **Proxy Host** com os seguintes valores:

| Campo | Valor |
|---|---|
| Domain Names | `mcinfradashcam.duckdns.org` |
| Scheme | `http` |
| Forward Hostname / IP | `127.0.0.1` se o NPM estiver no host; caso esteja em outro container, use o nome/IP acessível do serviço |
| Forward Port | `8088` |
| Block Common Exploits | Ativado |
| Websockets Support | Pode permanecer ativado |

Na aba **SSL**, solicite um novo certificado Let's Encrypt, aceite os termos e ative **Force SSL** e **HTTP/2 Support**. Salve e teste em `https://mcinfradashcam.duckdns.org`.

## Atenção quando o Nginx Proxy Manager também estiver em Docker

Se o NPM estiver em um container separado, `127.0.0.1` aponta para o próprio container do NPM, não para a VPS. Nesse caso, conecte ambos os serviços a uma rede Docker compartilhada e encaminhe para o nome do serviço, ou encaminhe para o IP do host usando a configuração de rede disponível na sua instalação. Não exponha a porta 8088 publicamente sem necessidade.

## 4. DNS e firewall

O registro DuckDNS precisa apontar para o IP público da VPS. As portas TCP 80 e 443 devem estar liberadas no firewall e direcionadas ao Nginx Proxy Manager. A porta 8088 deve continuar restrita ao localhost ou à rede interna usada pelo proxy.

## Diagnóstico rápido

Se o domínio não abrir, valide primeiro `curl -I http://127.0.0.1:8088/` na VPS. Se funcionar, o problema está entre o Nginx Proxy Manager, DNS ou firewall. Se o container não iniciar, execute `docker compose logs --tail=100`. Se a rota `/dashcam` retornar 404, confirme que o Proxy Host está encaminhando para o Nginx do container e que o arquivo `docker/nginx.conf` foi aplicado durante o build.

O link do WhatsApp incluído na página ainda é genérico (`wa.me/?text=...`). Antes de divulgar o site, substitua-o pelo número oficial da MC Infra TI no arquivo `client/src/pages/Dashcam.tsx` e gere novamente a imagem com `docker compose up -d --build`.
