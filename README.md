# **Pensar em um nome**

Esse projeto tem como objetivo fazer consulta na API do Interpol e Fbi para realizar a extração dos dados dos criminosos.

# **Funcionalidades**
- [x] Possui um método getFinanceTerrorism que retorna uma lista de criminosos financeiros que bate direto na API da Interpol e do Fbi.​
- [X] Possui um método getDetail que recebe um entity_id e retorna os detalhes do criminoso.​
- [X] É método fromInterpolDetailJson para criar uma instância da classe a partir dos detalhes fornecidos pela Interpol e Fbi.
- [X] GetFinanceTerrorism buscar detalhes de cada criminoso e retornar uma lista de objetos Terrorist.​

## **Funcionalidades extras**
> **Categoria:** Logíca de negócios




## **Entregaveis**

- [X] Repositório público GitHub com os principais requisitos implementados.
- [X] Arquivo de documentação que explica como usar a API.

## **Como executar e usar**
- Clona o repositorio:  `git clone https://github.com/GuilhermeJahnke/idwall_challenger_fiap`

### **Using the API:**

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
