import colecaoUf from '../dados/dados.js'

export const buscarUfs = () => {      // retorna toda a coleção
    return colecaoUf;
}

export const buscarUfsPorNome = (nomeUf) => {      //Busca UF pelo nome
    return colecaoUf.filter(uf => uf.nome.toLowerCase().includes(nomeUf.toLowerCase()));
};

export const buscarUfsPorId = (id) => {     // retorna id espesificado
    const idUF = parseInt(id);
    return colecaoUf.find(uf => uf.id === idUF);
}

//import colecaoUf from "./dados/dados.js";
import express from 'express';
import { buscarUfs, buscarUfsPorId, buscarUfsPorNome } from './servicos/servico.js';

const app = express();

app.get('/ufs', (req, res) => {
    const nomeUf = req.query.busca;
    const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : buscarUfs();

    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({ "erro": "Nenhuma UF encontrada" })
    }
});

app.get('/ufs/:iduf', (req, res) => {
    const idUf = parseInt(req.params.iduf);
    const uf = buscarUfsPorId(idUf);

    if (uf) {
        res.json(uf)
    } else if(isNaN(idUf)) {
        res.status(400).json({ "erro": "Requisição inválida" });
    }else{
        res.status(404).json({ "erro": "UF não encontrada" });
    }
})

app.listen(8080, () => {
    let data = new Date();
    console.log("Servidor iniciado na porta 8080 em: " + data);
})