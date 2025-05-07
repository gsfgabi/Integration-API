const express = require('express');
const app = express();
const port = 3000;
const { swaggerUi, swaggerDocs } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());

// Exercício 1 
app.post('/somar', (req, res) => {
    const { valores } = req.body;

    if (!Array.isArray(valores) || valores.length === 0) {
        return res.status(400).json({ erro: 'Envie uma lista de números!' });
    }

    const soma = valores.reduce((acc, num) => acc + num, 0);
    res.json({ resultado: soma });

/**
 * @swagger
 * /somar:
 *   post:
 *     summary: Soma os valores de uma lista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valores:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Retorna a soma dos valores
 *       400:
 *         description: Erro na entrada
 */

// Exercício 2 
app.post('/ordenar', (req, res) => {
    const { valores } = req.body;

    if (!Array.isArray(valores) || valores.length === 0) {
        return res.status(400).json({ erro: 'Envie uma lista de números!' });
    }

    const ordenados = valores.sort((a, b) => a - b);
    res.json({ resultado: ordenados });
});
/**
 * @swagger
 * /ordenar:
 *   post:
 *     summary: Ordena uma lista de números
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valores:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Lista ordenada
 *       400:
 *         description: Erro na entrada
 */

// Exercício 3 
app.post('/par_impar', (req, res) => {
    const { valor } = req.body;

    if (typeof valor !== 'number') {
        return res.status(400).json({ erro: 'Envie um número válido!' });
    }

    const resultado = valor % 2 === 0 ? 'par' : 'ímpar';
    res.json({ resultado });
});
/**
 * @swagger
 * /par_impar:
 *   post:
 *     summary: Verifica se um número é par ou ímpar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *     responses:
 *       200:
 *         description: Resultado da verificação
 *       400:
 *         description: Erro na entrada
 */

// Exercício 4 
app.post('/contar_palavras', (req, res) => {
    const { frase } = req.body;

    if (typeof frase !== 'string') {
        return res.status(400).json({ erro: 'Envie uma frase válida!' });
    }

    const quantidade = frase.trim().split(/\s+/).length;
    res.json({ quantidade_palavras: quantidade });
});
/**
 * @swagger
 * /contar_palavras:
 *   post:
 *     summary: Conta o número de palavras em uma frase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               frase:
 *                 type: string
 *     responses:
 *       200:
 *         description: Quantidade de palavras
 *       400:
 *         description: Erro na entrada
 */

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


