# DangeJS Webhook

Barebone DangerJS Webhook Server

## Usage

```sh
make start

# Start Proxy
npm i -g smee-client
smee -u {{url}} -p 8780
```

## Environment Variable

You can store environment variables in `.env`

It should contains following fields:

| Name           | Description                              |
| -------------- | ---------------------------------------- |
| GHE_HOST       | Github Host, Default is `api.github.com` |
| GITHUB_TOKEN   | Github Token                             |
| WEBHOOK_SECRET | Webhook Secret, Default is `mysecret`    |
