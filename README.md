# Teste-Tecnico-Shopper

Back-end de um serviço que gerencia a leitura individualizada de   
consumo de água e gás. Para facilitar a coleta da informação, o serviço utilizará IA para   
obter a medição através da foto de um medidor.

## Tecnologias
- Node.js
- Express.js
- Typescript
- prisma
- docker
- zod

## Rotas 

### 1. `POST /upload`
Este endpoint recebe uma imagem em base 64, consulta a API do Google Gemini para extrair o valor da leitura, e retorna o resultado.

#### **Request Body**
```json
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" | "GAS"
}
```

#### **Response**
- **200 OK**
  ```json
  {
    "image_url": "string",
    "measure_value": integer,
    "measure_uuid": "string"
  }
  ```
- **400 Bad Request**
  ```json
  {
    "error_code": "INVALID_DATA",
    "error_description": "Descrição do erro"
  }
  ```
- **409 Conflict**
  ```json
  {
    "error_code": "DOUBLE_REPORT",
    "error_description": "Leitura do mês já realizada"
  }
  ```

### 2. `PATCH /confirm`
Este endpoint é responsável por confirmar ou corrigir o valor lido pelo LLM.

#### **Request Body**
```json
{
  "measure_uuid": "string",
  "confirmed_value": integer
}
```

#### **Response**
- **200 OK**
  ```json
  {
    "success": true
  }
  ```
- **400 Bad Request**
  ```json
  {
    "error_code": "INVALID_DATA",
    "error_description": "Descrição do erro"
  }
  ```
- **404 Not Found**
  ```json
  {
    "error_code": "MEASURE_NOT_FOUND",
    "error_description": "Leitura não encontrada"
  }
  ```
- **409 Conflict**
  ```json
  {
    "error_code": "CONFIRMATION_DUPLICATE",
    "error_description": "Leitura já confirmada"
  }
  ```

### 3. `GET /<customer_code>/list`
Este endpoint lista as medições realizadas por um determinado cliente.

#### **Query Parameters**
- `measure_type` (opcional): Filtra as leituras pelo tipo especificado (`WATER` ou `GAS`). A validação é case insensitive.

#### **Response**
- **200 OK**
  ```json
  {
    "customer_code": "string",
    "measures": [
      {
        "measure_uuid": "string",
        "measure_datetime": "datetime",
        "measure_type": "string",
        "has_confirmed": boolean,
        "image_url": "string"
      },
      {
        "measure_uuid": "string",
        "measure_datetime": "datetime",
        "measure_type": "string",
        "has_confirmed": boolean,
        "image_url": "string"
      }
    ]
  }
  ```
- **400 Bad Request**
  ```json
  {
    "error_code": "INVALID_TYPE",
    "error_description": "Tipo de medição não permitida"
  }
  ```
- **404 Not Found**
  ```json
  {
    "error_code": "MEASURES_NOT_FOUND",
    "error_description": "Nenhuma leitura encontrada"
  }
  ```
