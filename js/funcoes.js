$(document).ready(function(){
  $('select').formSelect();
});

//------------------------------------------------
function getPosicaoElemento( aMatriz , xElemento )
{

    var retorno = null ;

    for( var i = 0 , len = aMatriz.length; i < len ; i++ )
    {
      if( aMatriz[i][0] == xElemento )
      {
        retorno = i ;
      }

    }

    return retorno ;

 } 


//---------------------------------
 function ordenarTabela(nomeTabela)
 {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(nomeTabela);
  switching = true;
  
  while (switching)
  {
    switching = false;
    rows = table.rows;
  
    for (i = 1; i < (rows.length - 1); i++) 
    {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
     
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) 
      {
        shouldSwitch = true;
        break;
      }
    }

    if (shouldSwitch) 
    {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}


//----------------------------------------------------------------
function criarTabela(nomeDivdaTabela,matrizDadosTabela,nomeTabela)
{

  var textoTabela = '<table id="' + nomeTabela + '" class="striped responsive-table table_padrao" >';
  
  textoTabela += '<thead>' + inserirLinhasTabela(matrizDadosTabela[0],"th") + '</thead><tbody>';
  
  for( var i = 1 , linhaValores ; linhaValores = matrizDadosTabela[i++];){
    textoTabela += inserirLinhasTabela(linhaValores,"td");
  }

  var idTableDiv = document.getElementById(nomeDivdaTabela);
  idTableDiv.innerHTML = textoTabela + '</tbody></table>';
}

//------------------------------------------------
function inserirLinhasTabela(dadosCelulas,tagTdTh)
{

  var linhaComCelulas = '<tr>';
  
  for ( var k = 0, valorCelula ; valorCelula = dadosCelulas[k++];) {
    linhaComCelulas += '<' + tagTdTh + '>' + valorCelula + '</' +tagTdTh + '>';
  }
  
  linhaComCelulas += '</tr>';
  
  return linhaComCelulas;

}

//----------------------------
function dataFormatada(data) {
    this.ano = data.getFullYear();
    this.mes = data.getMonth() + 1 ;
}

dataFormatada.prototype.anoMes = function() {
    return this.ano + ( 100 + this.mes).toString().substring( 1 , 3 );
}

dataFormatada.prototype.mesAno = function() {
    return ( 100 + this.mes).toString().substring( 1 , 3 ) + this.ano;
}

