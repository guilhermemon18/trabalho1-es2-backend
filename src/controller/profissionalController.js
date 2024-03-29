const profissionalServices = require('../services/profissionalServices');
const especialidadeServices = require('../services/especialidadeServices');
const timeServices = require('../services/timeServices');

const listarProfissional = async (req, res) => {
    let json = {error:'', result:[]};

    let profissionais = await profissionalServices.listarProfissional();

    for(let i in profissionais){
        let time = await timeServices.buscarTime(profissionais[i].Time_idTime);
        let especialidade = await especialidadeServices.buscarEspecialidade(profissionais[i].Especialidade_idEspecialidade);
        json.result.push({
            idProfissional: profissionais[i].idProfissional,
            nomeCompleto: profissionais[i].nomeCompleto,
            nomeSocial: profissionais[i].nomeSocial,
            cpf: profissionais[i].cpf,
            dataNascimento: profissionais[i].dataNascimento,
            raca: profissionais[i].raca,
            genero: profissionais[i].genero,
            nroEndereco: profissionais[i].nroEndereco,
            complementoEndereco: profissionais[i].complementoEndereco,
            cep: profissionais[i].cep,
            idTime: time.idTime,
            time: time.nomeTime,
            especialidade: especialidade.tipoEspecialidade,
            siglaEspecialidade: especialidade.siglaEspecialidade,
        });
    }  
    res.json(json);
}

const buscarProfissional = async (req, res) => {
    let json = { error: '', result: {} };

    let idProfissional = req.params.id;
    let profissional = await profissionalServices.buscarProfissional(idProfissional);
    let time = await timeServices.buscarTime(profissional.Time_idTime);
    let especialidade = await especialidadeServices.buscarEspecialidade(profissional.Especialidade_idEspecialidade);

    console.log(profissional);

    if (profissional) {
        json.result = {
            idProfissional: profissional.idProfissional,
            nomeCompleto: profissional.nomeCompleto,
            nomeSocial: profissional.nomeSocial,
            cpf: profissional.cpf,
            dataNascimento: profissional.dataNascimento,
            raca: profissional.raca,
            genero: profissional.genero,
            nroEndereco: profissional.nroEndereco,
            complementoEndereco: profissional.complementoEndereco,
            idEndereco: profissional.Endereco_idEndereco,
            idTime: time.idTime,
            time: time.nomeTime,
            especialidade: especialidade.tipoEspecialidade,
            siglaEspecialidade: especialidade.siglaEspecialidade,
        };
    }
    res.json(json);
}

const inserirProfissional = async(req, res) => {
    let json = {error:'', result:{}};

    let nomeCompleto = req.body.nomeCompleto;
    let nomeSocial = req.body.nomeSocial;
    let cpf = req.body.cpf;
    let dataNascimento = req.body.dataNascimento;
    let raca = req.body.raca;
    let genero = req.body.genero;
    let nroEndereco = req.body.nroEndereco;
    let complementoEndereco = req.body.complementoEndereco;
    let idEndereco = req.body.idEndereco;
    let idEspecialidade = req.body.idEspecialidade;
    let idTime = req.body.idTime;
/*
    console.log(nomeCompleto);
    console.log(nomeSocial);
    console.log(cpf);
    console.log(dataNascimento);
    console.log(raca);
    console.log(genero);
    console.log(nroEndereco);
    console.log(complementoEndereco);
    console.log(idEndereco);
    console.log(idEspecialidade);
    console.log(idTime);
*/
    if(nomeCompleto && cpf && dataNascimento && raca && genero && nroEndereco && idEndereco && idEspecialidade){
        let idProfissional = await profissionalServices.inserirProfissional(nomeCompleto, nomeSocial, cpf, dataNascimento, raca, genero, nroEndereco, complementoEndereco, idEndereco, idTime, idEspecialidade);
        json.result = {
            idProfissional: idProfissional,
            nomeCompleto,
            nomeSocial,
            cpf,
            dataNascimento,
            raca,
            genero,
            nroEndereco,
            complementoEndereco,
            idTime,
            idEspecialidade,
        };
    }else{
        json.error = 'Campos obrigatórios não enviados!';
    }
    res.json(json);
}

const alterarProfissional = async(req, res) => {
    let json = {error:'', result:{}};

    let idProfissional = req.params.id;
    let nomeCompleto = req.body.nomeCompleto;
    let nomeSocial = req.body.nomeSocial;
    let cpf = req.body.cpf;
    let dataNascimento = req.body.dataNascimento;
    let raca = req.body.raca;
    let genero = req.body.genero;
    let nroEndereco = req.body.nroEndereco;
    let complementoEndereco = req.body.complementoEndereco;
    let idEndereco = req.body.idEndereco;
    let idTime = req.body.idTime;
    let idEspecialidade = req.body.idEspecialidade;
    
    console.log(nomeCompleto);
    console.log(nomeSocial);
    console.log(cpf);
    console.log(dataNascimento);
    console.log(raca);
    console.log(genero);
    console.log(nroEndereco);
    console.log(complementoEndereco);
    console.log(idEndereco);
    console.log(idEspecialidade);
    console.log(idTime);

    if(nomeCompleto && cpf && dataNascimento && raca && genero && nroEndereco && idEndereco && idTime && idEspecialidade){
        await profissionalServices.alterarProfissional(idProfissional, nomeCompleto, nomeSocial, cpf, dataNascimento, raca, genero, nroEndereco, complementoEndereco, idEndereco, idTime, idEspecialidade);
        json.result = {
            idProfissional,
            nomeCompleto,
            nomeSocial,
            cpf,
            dataNascimento,
            raca,
            genero,
            nroEndereco,
            complementoEndereco,
            idTime,
            idEspecialidade,
        };
    }else{
        json.error = 'Campos obrigatórios não enviados!';
    }
    res.json(json);
}

const excluirProfissional = async(req, res) => {
    let json = {error:'', result:{}};

    await profissionalServices.excluirProfissional(req.params.id);
    
    res.json(json);
}

module.exports = {
    listarProfissional,
    buscarProfissional,
    inserirProfissional,
    alterarProfissional,
    excluirProfissional,
};