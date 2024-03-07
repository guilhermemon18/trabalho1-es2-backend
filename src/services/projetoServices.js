const database = require('../database/dbConfig');


const listarProjetos = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM projeto WHERE isAtivo = 1', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarProjeto= (idProjeto) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM projeto WHERE projeto.idProjeto = ? AND isAtivo = 1', [idProjeto], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
}

const inserirTime = (nomeTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('INSERT INTO time (nomeTime,isAtivo) VALUES (?,1)', [nomeTime], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results.insertCodigo);
        });
    });
}

const alterarTime = (idTime, nomeTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE time SET nomeTime = ?  WHERE idTime = ?', [nomeTime, idTime], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const excluirTime = (idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE time SET isAtivo = 0 WHERE idTime = ?', [idTime], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

module.exports = {
    listarProjetos,
    buscarProjeto,
    inserirTime,
    alterarTime,
    excluirTime
};