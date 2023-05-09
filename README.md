# Inversão de dependência no NestJS

![Diagrama de inversão de dependência](resource/exchange-rate-repository.png)

## Instalando

```bash
yarn install
cp .env.example .env
```

Para utilizar todas as funcionalidades do aplicativo, é necessário possuir uma
chave de API para acessar o https://freecurrencyapi.com/. Conforme o nome
sugere, a utilização dessa ferramenta é gratuita.

Para se cadastrar, basta acessar https://app.freecurrencyapi.com/register e
preencher o formulário de cadastro. Após confirmar o e-mail, acesse o painel de
controle para obter a chave de API. Então, copie e cole o valor obtido na
variável de ambiente `FREE_CURRENCY_CONVERSION_API_KEY` que deverá ser definida
no arquivo `.env`.

## Rodando o projeto

```bash
yarn run start:dev
```
