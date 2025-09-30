import express from 'express';
import { buscarUfs, buscarUfsPorId, buscarUfsPorNome, buscarUfsPorSigla, buscarUfsPorInicial } from './servico/servico.js';

const app = express();

app.get('/ufs', (req, res) => {
    const nomeUf = req.query.busca;
    const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : buscarUfs();

    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({ erro: "Nenhuma UF encontrada" });
    }
});

app.get('/ufs/:iduf', (req, res) => {
    const idUf = parseInt(req.params.iduf);
    if (isNaN(idUf)) {
        return res.status(400).json({ erro: "Requisição inválida. O ID deve ser um número." });
    }

    const uf = buscarUfsPorId(idUf);
    if (!uf) {
        return res.status(404).json({ erro: "UF não encontrada" });
    }

    res.json(uf);
});

app.get('/ufs/sigla/:sigla', (req, res) => {
    const sigla = req.params.sigla;
    if (sigla.length !== 2) {
        return res.status(400).json({ erro: "Sigla inválida. Use apenas 2 letras." });
    }

    const uf = buscarUfsPorSigla(sigla);
    if (uf) {
        return res.status(404).json({ erro: "UF não encontrada." });
    }

    res.json(uf);
});

app.get('/ufs/inicial/:letra', (req, res) => {
    const letra = req.params.letra;
    if (letra.length !== 1 || !/[A-Z]/i.test(letra)) {
        return res.status(400).json({ erro: "Parâmetro inválido. Informe apenas uma letra." });
    }

    const filtradas = buscarUfsPorInicial(letra);
    if (filtradas.length === 0) {
        return res.status(404).json({ erro: "Nenhuma UF encontrada com essa inicial." });
    }

    res.json(filtradas);
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080 em: " + new Date());
});