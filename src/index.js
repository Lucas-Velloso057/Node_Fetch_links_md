import chalk from 'chalk';
import { log } from 'console';
import fs from "fs";


function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?.#].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultado = capturas.map(captura => ({[captura[1]]: captura[2]}));
  return resultado.length != 0 ? resultado : "Não há links no arquivo!" ;
  
}
function trataErro(erro) {
  throw new Error(chalk.red(erro.code, "Não há o arquivo no diretório!"));
}

// async/await

async function pegaArquivo(caminhoDoArquivo) {
  try{
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return(extraiLinks(texto));
  }
  catch(erro){
    trataErro(erro)
  }
}

export default pegaArquivo;

// \[[^[\]]*?\]                                                tags antes dos links

// /\(https?:\/\/([^\s?.#]).[^\s]*\)/gm                         links entre parenteses

// \[([^[\]]*?)\]\((https?:\/\/[^\s?.#].[^\s]*)\)               regex completo com separação entre os grupos