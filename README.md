# **Idawll challenger fiap**

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
- [x] [Documentação tecnica](https://fiapcom-my.sharepoint.com/:p:/g/personal/rm94285_fiap_com_br/ESStAFvND41Okwp7DcO2GYYBez_bI9dnzGQAqFyj6bhiKw?e=MJDzQB)
- [x] [Documentação detalhada](https://fiapcom-my.sharepoint.com/:p:/g/personal/rm92923_fiap_com_br/EaMHirWSFcJLkDGdJZMHadYBCMmJlRvrWyrAPm6dydnTFw?e=bfvMFf)

## **Como executar e usar**
- Clona o repositorio:  `git clone https://github.com/GuilhermeJahnke/idwall_challenger_fiap`
- Acessa a pasta do projeto no terminal: `cd idwall_challenger_fiap`
- Instale as dependências: `npm install`
- Execute a aplicação: `npm start`

#### **Endpoints:**

- **GET** `/Criminal`
- **Description:** Retorna os dados dos criminosos.
- **Response:**
  ```json
  {
  "id": "string",
  "full_name": "string",
  "nationality": "string",
  "dateOfBirth": "DateTime",
  "photoUrl": "String",
  "sex": "String",
  "collectedFrom": "String",
  "crimes": "Crime[]",
  }

- **GET** `/Crime`
- **Description:** Retorna os crimes.
- **Response:**
  ```json
  {
  "id":"Int"
  "name":"String"
  "description":"String"
  "criminals":"Criminal[]"
  } 
   

### **Decisões Técnicas:**
- **[NodeJs](https://nodejs.org/en)** Decedimos usar NodeJs pelo Desenvolvimento rápido
- **[TypeScript](https://www.typescriptlang.org/)** Como Linguagem de programação
- **[Docker](https://docker.com/)** Como gerenciamento de Versões:
- **[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)** Como o padrão arquitetônico.

### **Pessoas Autoras:**

- *[Felipe](https://github.com/GuilhermeJahnke)*
- *[Bernardo](https://github.com/bernardomoraes)*
- *[Guilherme](https://github.com/Zapotoczn)*
- *[Thamires](https://github.com/ThamiresAluiza)*
- *[Gustavo](https://github.com/gustavoGui17)*
