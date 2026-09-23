# Fake Store Produtos

Aplicativo Expo em JavaScript e React Native consumindo a Fake Store API.

## Como rodar

1. Instale as dependencias do projeto:

```bash
npm install
```

2. Inicie o Expo:

```bash
npm start
```

3. Abra no Expo Go, emulador Android, simulador iOS ou navegador pelo menu do Expo.

## Como verificar usuarios para login

Acesse o endpoint abaixo no navegador:

```text
https://fakestoreapi.com/users
```

Use os campos `username` e `password` de um usuario retornado pela API. O app consulta esse endpoint antes de chamar `POST /auth/login`.

## Integrantes do grupo

- Vinicius Hoffelder Colussi | RA: 1137833
- Victor Quadri | RA: 1136643 
- Joao Vitor Buratti | RA: 1136821
- Eduardo Barreda | RA: 1138704


## Recursos implementados

- Login com usuarios reais da Fake Store API.
- Listagem de produtos em `FlatList`.
- Filtro por categoria com botao para limpar filtro.
- Tela de detalhes consumindo `GET /products/{id}`.
- Tela de informacoes do grupo.
- Consumo da API com `axios`.
- Navegacao com React Navigation Stack.
