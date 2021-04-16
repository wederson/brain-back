# Introdução

Para a camada de backend eu utilizei o Adonis para facilitar o desenvolvimento e ficar na mesma stack que a Brain utiliza.

## Rotas

O projeto possui algumas rotas principais:
1. GET "/" - Retorna apenas um Hello world
2. GET "/popular" - popula o DB com alguns agricultores
3. GET "/totalporcidade" - retorna a quantidade de agricultores por cidade
4. GET "/agriculturists" - lista os agricultores
4. GET "/agriculturists/:id" - retorna um agricultores
5. POST "/agriculturists" - adiciona um agricultor
6. PUT "/agriculturists/:id" - edita um agricultor

> Totas essas rotas estão no arquivo "Insomnia_Brain". Basta baixar o Insomnia e importar o arquivo json

## Setup

Criar o arquivo .env com base no arquivo .env.example.
Trocar os parâmetros de banco de dados para a sua configuração local

```bash
npm install
adonis migration:run
adonis serve --dev
```

