import chalk from "chalk";

function extraiLinks(arrayLinksObjetos) {
  return arrayLinksObjetos.map((objetoLink) => Object.values(objetoLink).join())
}

async function checaStatus(arrayLinks) {
  const arrStatus = await Promise.all(
    arrayLinks.map(async (url) =>{
      try{
        const response = await fetch(url) ;
        return `${response.status} - ${response.statusText}`;
      }catch(erro){
        return manejaErros(erro);
      }
  })
  )
  return arrStatus;  
}

function manejaErros(erro) {
  if(erro.cause.code === "ENOTFOUND"){
    return "Link não encontrado"
  }
  else{
    return "Ocorreu algum erro"
  }
}

export default async function listaValidada(listaDeLinks){
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);
  return listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    "Status" : status[indice]
  }));
}

