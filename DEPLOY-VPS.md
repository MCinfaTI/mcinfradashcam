# Implantação na VPS — MC Infra TI Dash Cam

## Arquitetura corrigida

A VM dos projetos executa somente o container Node da aplicação. Não há Nginx local nesse servidor. O container compila a aplicação React e executa o servidor HTTP Express incluído no projeto, que entrega `dist/public` e faz fallback para as rotas `/` e `/dashcam`.

O Docker Compose publica a aplicação na porta `8088` da VM dos projetos, encaminhando internamente para a porta `3000` do container. A VM separada do Nginx Proxy Manager acessa essa porta pela rede privada ou pelo IP interno da VM dos projetos.

## 1. Atualizar o código na VM dos projetos

```bash
git clone https://github.com/amdremessias/mcinfra-dashcam.git
cd mcinfra-dashcam
```

Se o diretório já existir:

```bash
cd /opt/mcinfra-dashcam
git pull
```

## 2. Construir e iniciar o serviço

```bash
docker compose up -d --build
docker compose ps
curl -I http://127.0.0.1:8088/
```

O `curl` deve retornar `HTTP/1.1 200 OK`. Para acompanhar o serviço:

```bash
docker compose logs -f --tail=100
```

O Dockerfile copia `patches/` antes do `pnpm install`, corrigindo o erro `ENOENT` relacionado a `patches/wouter@3.7.1.patch`.

Para atualizar depois de novos commits:

```bash
git pull
docker compose up -d --build
```

## 3. Configurar o Proxy Host no Nginx Proxy Manager

Na UI do Nginx Proxy Manager instalado na outra VM, crie ou edite um **Proxy Host**:

| Campo | Valor |
|---|---|
| Domain Names | `mcinfradashcam.duckdns.org` |
| Scheme | `http` |
| Forward Hostname / IP | IP interno ou hostname da VM dos projetos |
| Forward Port | `8088` |
| Block Common Exploits | Ativado |
| Websockets Support | Ativado ou padrão |

Não use `127.0.0.1` no campo **Forward Hostname / IP**, pois isso apontaria para a VM do próprio Nginx Proxy Manager. Use, por exemplo, o IP privado da VM onde o Docker está executando, como `192.168.x.x`, conforme a sua rede.

Na aba **SSL**, solicite um certificado Let's Encrypt para `mcinfradashcam.duckdns.org`, aceite os termos, ative **Force SSL** e, opcionalmente, **HTTP/2 Support**. O domínio deve apontar para o IP público da VM que recebe o Nginx Proxy Manager, não necessariamente para a VM dos projetos.

## 4. Rede e firewall

A porta TCP `8088` precisa ser acessível somente pela VM do Nginx Proxy Manager. Se utilizar UFW na VM dos projetos, permita apenas o IP interno do NPM:

```bash
sudo ufw allow from IP_DA_VM_DO_NPM to any port 8088 proto tcp
```

Evite abrir a porta `8088` para a internet inteira. As portas públicas `80` e `443` devem continuar sendo responsabilidade do Nginx Proxy Manager.

## Diagnóstico rápido

Se o build falhar novamente, confirme que a pasta `patches` está presente no checkout:

```bash
ls -la patches
```

Se o container não iniciar:

```bash
docker compose logs --tail=100 mcinfra-dashcam
```

Se `curl -I http://127.0.0.1:8088/` funcionar na VM dos projetos, mas o domínio não abrir, verifique o IP usado no **Forward Hostname / IP**, a rota entre as duas VMs, o firewall e o certificado no NPM.

O link do WhatsApp da página ainda é genérico (`wa.me/?text=...`). Antes da divulgação, substitua-o pelo número oficial da MC Infra TI em `client/src/pages/Dashcam.tsx` e refaça o build.
