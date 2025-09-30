import colecaoUf from "./dados/dados.js";
import express from 'express';

const app = express();

app.get('ufs/:iduf', (req,res) =>{
    res.json(colecaoUf);
})

app.get('ufs/:iduf', (req,res) =>{
    const idUf = parseInt(req.params.idUf);
    let mensagemErro = "";
    let uf;
    if (!(isNaN(idUf))) {
        uf = colecaoUf.find(u => u.id === idUf);
        if (!uf){
            mensagemErro = "UF não encontrada";
        }
    } else {
        mensagemErro = "Requisição inválida"
    }

    if (uf) {
        res.json(uf)
    } else {
        res.status(404).json({"erro": mensagemErro});
    }
})

app.listen(8080, () => {
    let data = new Date();
    console.log("Servidor iniciado na porta 8080 em: " + data);
})
