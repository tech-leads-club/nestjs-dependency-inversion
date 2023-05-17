# Inversão de dependência no NestJS

![Diagrama de inversão de dependência](resource/exchange-rate-repository.png)

## Faça parte já da Tech Leads club

Para uma exploração completa e detalhada do Princípio de Inversão de Dependência
dess repositório, incluindo um passo a passo, a análise dos benefícios e os
possíveis trade-offs, confira nosso artigo completo. Ele está disponível na
comunidade Tech Leads Club, que você pode acessar pelo link abaixo 👇

https://www.techleads.club/c/desenvolvimento-e-arquitetura-de-software/inversao-de-dependencia-protega-se-de-mudancas-externas

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

Você pode testar a API no seguinte endpoint:

- `GET http://localhost:3000/exchange-rate/spot-price?fromCurrency=USD&toCurrency=EUR`
  - Responde com o último preço de USD em EUR.
- `GET http://localhost:3000/exchange-rate/spot-price?fromCurrency=CLP&toCurrency=USD`
  - Exemplo da redundância em ação.
