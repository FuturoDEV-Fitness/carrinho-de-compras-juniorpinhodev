# Projeto Carrinho de Compras ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)


Este projeto é um **Carrinho de Compras** desenvolvido com **Node.js**, **Express**, e **PostgreSQL**. A API oferece funcionalidades para gerenciar um sistema de compras, incluindo:

- **Gerenciamento de Clientes**: Adicione e atualize clientes com nome, email, CPF e contato.
- **Gerenciamento de Produtos**: Cadastre produtos com informações como nome, quantidade, cor, voltagem e descrição.
- **Gestão de Pedidos**: Crie pedidos que associam clientes a produtos, com detalhes sobre o total do pedido, endereço de entrega e observações.

A API é baseada em endpoints RESTful, proporcionando uma solução eficiente e organizada para um sistema de carrinho de compras.

## Tecnologias Utilizadas

- **Node.js** ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
  - Ambiente de execução JavaScript no servidor.
- **Express** ![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
  - Framework web para Node.js.
- **PostgreSQL** ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
  - Sistema de gerenciamento de banco de dados relacional.
- **dotenv** ![dotenv](https://img.shields.io/badge/dotenv-0A0A0A?logo=dotenv&logoColor=white)
  - Módulo para carregar variáveis de ambiente a partir de um arquivo `.env`.


## Requisitos

- Node.js
- PostgreSQL
- npm ou yarn

## Instalação

1. Clone o repositório:

    ```sh
    git clone https://github.com/juniorpinhodev/carrinho-de-compras.git
    ```

2. Navegue até o diretório do projeto:

    ```sh
    cd carrinho-de-compras
    ```

3. Instale as dependências:

    ```sh
    npm install
    ```

4. Configure o banco de dados PostgreSQL criando um arquivo `.env` na raiz do projeto com as seguintes informações:

    ```env
    DB_USER=seu_usuario
    DB_HOST=localhost
    DB_DATABASE=nome_do_banco_de_dados
    DB_PASSWORD=sua_senha
    DB_PORT=5432
    ```

5. Execute as migrações SQL para criar as tabelas necessárias:

    ```sql
    -- Exemplo de migrações SQL:
    CREATE TABLE clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        cpf VARCHAR(11) UNIQUE NOT NULL,
        contact VARCHAR(20) NOT NULL
    );

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        amount INTEGER NOT NULL,
        color VARCHAR(50) NOT NULL,
        voltage VARCHAR(10) NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER NOT NULL
    );

    CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES clients(id),
        total NUMERIC(10, 2) NOT NULL,
        address VARCHAR(255) NOT NULL,
        observations TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE orders_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id),
        product_id INTEGER NOT NULL REFERENCES products(id),
        amount INTEGER NOT NULL,
        price NUMERIC(10, 2) NOT NULL
    );
    ```

6. Inicie o servidor:

    ```sh
    npm start
    ```

## Endpoints

### Clientes

- **Criar Cliente**

    - Método: `POST`
    - URL: `/api/clients`
    - Body:
      ```json
      {
        "name": "Nome do Cliente",
        "email": "email@example.com",
        "cpf": "12345678901",
        "contact": "123456789"
      }
      ```

### Produtos

- **Criar Produto**

    - Método: `POST`
    - URL: `/api/products`
    - Body:
      ```json
      {
        "name": "Nome do Produto",
        "amount": 10,
        "color": "Cor",
        "voltage": "110",
        "description": "Descrição do produto",
        "category_id": 1
      }
      ```

- **Listar Todos os Produtos**

    - Método: `GET`
    - URL: `/api/products`

- **Obter Produto com Detalhes**

    - Método: `GET`
    - URL: `/api/products/:id`

### Pedidos

- **Criar Pedido**

    - Método: `POST`
    - URL: `/api/orders`
    - Body:
      ```json
      {
        "client_id": 1,
        "total": 100.50,
        "address": "Endereço de entrega",
        "observations": "Observações",
        "items": [
          {
            "product_id": 1,
            "amount": 2,
            "price": 50.25
          }
        ]
      }
      ```

## Testando com Insomnia

1. **Criar Cliente**
    - Método: `POST`
    - URL: `http://localhost:3333/api/clients`
    - Body:
      ```json
      {
        "name": "João da Silva",
        "email": "joao.silva@example.com",
        "cpf": "12345678900",
        "contact": "11987654321"
      }
      ```

2. **Criar Produto**
    - Método: `POST`
    - URL: `http://localhost:3333/api/products`
    - Body:
      ```json
      {
        "name": "Notebook",
        "amount": 15,
        "color": "Cinza",
        "voltage": "110",
        "description": "Notebook 15.6 polegadas",
        "category_id": 2
      }
      ```

3. **Listar Todos os Produtos**
    - Método: `GET`
    - URL: `http://localhost:3333/api/products`

4. **Obter Produto com Detalhes**
    - Método: `GET`
    - URL: `http://localhost:3333/api/products/1`

5. **Criar Pedido**
    - Método: `POST`
    - URL: `http://localhost:3333/api/orders`
    - Body:
      ```json
      {
        "client_id": 1,
        "total": 100.50,
        "address": "Rua Exemplo, 123",
        "observations": "Entregar no período da manhã",
        "items": [
          {
            "product_id": 1,
            "amount": 2,
            "price": 50.25
          }
        ]
      }
      ```

## Licença

![Licença ISC](https://img.shields.io/badge/License-ISC-blue)
Este projeto está licenciado sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Agradecimentos

Gostaria de expressar minha gratidão ao programa **Floripa Mais Tec** por seu apoio e orientação durante o desenvolvimento deste projeto.


