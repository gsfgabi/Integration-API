import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const app = express();
const PORT = 3001;

app.use(express.json()); 
app.use(cors());

const urls = {}; 

app.post("/encurtar", (req, res) => {
    const { url } = req.body; 
    const id = nanoid(6); 
    urls[id] = url; 
    res.json({ shortUrl: `http://localhost:${PORT}/${id}` }); 
});

app.get("/:id", (req, res) => {
    const url = urls[req.params.id]; 
    if (url) {
        res.redirect(url); 
    } else {
        res.status(404).send("URL não encontrada");
    }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

