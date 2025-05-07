const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Exercícios',
      description: 'API simples para testes de soma, ordenação, par/ímpar e contagem de palavras',
      version: '1.0.0',
    },
  },
  apis: ['./app.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs
};
