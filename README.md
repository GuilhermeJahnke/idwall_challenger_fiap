# **Idwall challenger fiap**

Esse projeto tem como objetivo fazer consulta na API do Interpol e da Fbi para realizar a extração dos dados dos criminosos.

# **Funcionalidades**
- [x] Possui um método getFinanceTerrorism que retorna uma lista de criminosos financeiros que bate direto na API da Interpol e do Fbi.​
- [X] Possui um método getDetail que recebe um entity_id e retorna os detalhes do criminoso.​
- [X] É método fromInterpolDetailJson para criar uma instância da classe a partir dos detalhes fornecidos pela Interpol e Fbi.
- [X] GetFinanceTerrorism buscar detalhes de cada criminoso e retornar uma lista de objetos Terrorist.​

## **Tecnologias**
- [x] [NodeJs](https://nodejs.org/en)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [Docker](https://docker.com/)

## **Entregaveis**

- [X] Repositório público GitHub com os principais requisitos implementados.
- [X] Arquivo de documentação que explica como usar a API.
- [x] [Documentação tecnica]:
- [x] [Documentação detalhada]:

## **Como executar e usar**
- Clona o repositorio:  `git clone https://github.com/GuilhermeJahnke/idwall_challenger_fiap`
- Acessa a pasta do projeto no terminal: `cd idwall_challenger_fiap`
- Instale as dependências: `npm install`
- Execute a aplicação em modo desenvolvimento: `npm run start:dev`
- Agora é so executar os requests que deseja na URL Base: `http://localhost:3000`

## **Endpoints:**

### Criminals

- **GET** `/criminals/:id`
- **Description:** Retorna os do criminoso por ID.
- **Response:**
  ```json
  {
  "id": "string",
  "full_name": "string",
  "nationality": "string",
  "dateOfBirth": "string",
  "photoUrl": "string",
  "sex": "string",
  "collectedFrom": "string",
  "crimes": "Crime[]",
  }
  ```

---
- **GET** `/criminals`
- **Description:** Retorna os dados dos criminosos de acordo com o filtro, caso não possua, retorna todos.
- **Query Parameters:**
  ```ts
  interface QueryParams {
    fullName: string
    sex: "F" | "M"
    crime: string
    sort: "asc" | "desc"
    orderBy: "fullName" | "dateOfBirth"
    skip: number
    take: number
  }
  ```
- **Response:**
  ```json
  [
    {
      "id": "string",
      "full_name": "string",
      "nationality": "string",
      "dateOfBirth": "string",
      "photoUrl": "string",
      "sex": "string",
      "collectedFrom": "string",
      "crimes": "Crime[]",
    }
  ]
  ```

---
- **POST** `/criminals`
- **Description:** Cria um criminoso no banco de dados.
- **Body:**
  ```json
  {
   "fullName":"string",
   "dateOfBirth":"string",
   "nationalities":"string",
   "entityId":"string",
   "sex":"string",
   "arrestWarrants":"string",
   "photoUrl":"string",
   "crimes":"string[]",
   "collectedFrom":"string"
  }
  ```
- **Response:**
  ```json
  {
  "id": "string",
  "full_name": "string",
  "nationality": "string",
  "dateOfBirth": "string",
  "photoUrl": "string",
  "sex": "string",
  "collectedFrom": "string",
  "crimes": "Crime[]",
  }
  ```
---
- **PATCH** `/criminals/:id`
- **Description:** Atualiza um criminoso no banco de dados.
- **Body:**
  ```json
  {
   "fullName":"string",
   "dateOfBirth":"string",
   "nationalities":"string",
   "entityId":"string",
   "sex":"string",
   "arrestWarrants":"string",
   "photoUrl":"string",
   "crimes":"string[]",
   "collectedFrom":"string"
  }
  ```
  PS: Não é necessário enviar todos os campos, apenas os que deseja atualizar.

- **Response:**
  ```json
  {
  "id": "string",
  "full_name": "string",
  "nationality": "string",
  "dateOfBirth": "string",
  "photoUrl": "string",
  "sex": "string",
  "collectedFrom": "string",
  "crimes": "Crime[]",
  }
  ```

---
- **DELETE** `/criminals/:id`
- **Description:** Deleta e retorna o criminoso deletado do banco de dados.
- **Response:**
  ```json
    {
    "id": "string",
    "full_name": "string",
    "nationality": "string",
    "dateOfBirth": "string",
    "photoUrl": "string",
    "sex": "string",
    "collectedFrom": "string",
    "crimes": "Crime[]",
    }
    ```

### Crimes
- **GET** `/crimes`
- **Description:** Retorna uma lista com todos os crimes.
- **Response:**
  ```json
  [
    {
      "id":"Int",
      "name":"String",
    }
  ]
  ```
---

- **POST** `/crimes`
- **Description:** Cria um crime no banco de dados.
- **Body:**
  ```json
  {
    "name":"String",
  }
  ```

- **Response:**
  ```json
  {
    "id":"Int",
    "name":"String",
  }
  ```
---

- **PATCH** `/crimes/:id`
- **Description:** Atualiza um crime no banco de dados.
- **Body:**
  ```json
  {
    "name":"String",
  }
  ```

- **Response:**
  ```json
  {
    "id":"Int",
    "name":"String",
  }
  ```
---

- **DELETE** `/crimes/:id`
- **Description:** Deleta e retorna um crime no banco de dados.
- **Response:**
  ```json
  {
    "id":"Int",
    "name":"String",
  }
  ```


## **Decisões Técnicas:**
- **[NodeJs](https://nodejs.org/en)** Decedimos usar NodeJs pelo Desenvolvimento rápido
- **[TypeScript](https://www.typescriptlang.org/)** Como Linguagem de programação
- **[Docker](https://docker.com/)** Como gerenciamento de Versões:
- **[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)** Como o padrão arquitetônico.

## **Pessoas Autoras:**

- *[Felipe](https://github.com/GuilhermeJahnke)*
- *[Bernardo](https://github.com/bernardomoraes)*
- *[Guilherme](https://github.com/Zapotoczn)*
- *[Thamires](https://github.com/ThamiresAluiza)*
- *[Gustavo](https://github.com/gustavoGui17)*
