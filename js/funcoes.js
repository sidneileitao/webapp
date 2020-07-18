$(document).ready(function(){
  $('select').formSelect();
});



function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tabelaPagamentos");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[7];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function filtrarLinhas(opcaoSelecionada,nColuna) {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  //input = document.getElementById("myInput");
  input = opcaoSelecionada; //document.getElementById("myInput");
  filter = input.toUpperCase();
  table = document.getElementById("tabelaPagamentos");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[nColuna];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if ( (txtValue.toUpperCase().indexOf(filter) > -1) || filter == "TODOS") {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


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


//------------------------------------------------
function inserirLinhasTabela(dadosCelulas,tagTdTh)
{

  var linhaComCelulas = '<tr>';
  var cFormatoDado = " ";
  
  for ( var k = 0, len = dadosCelulas.length; k < len; k++)
  {
    
    if(this.tiposColunas[k] == "number")
    {
      cFormatoDado = ' class="right-text"' ;
    }
    else{
      cFormatoDado = ' class="left-text"' ;
    };
   
    if( tagTdTh == "td" ){
      cFormatoDado += ' id="' + this.colunas[k] + '"' ;
    }

    linhaComCelulas += '<' + tagTdTh + cFormatoDado + ' >' + dadosCelulas[k] + '</' +tagTdTh + '>';
    
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

//--------------------
function TabelaDados()
{
  this.colunas = [];
  this.tiposColunas = [];  
  this.linhas = [];  
  this.formatoColuna = [];
 
  this.adicionarColunas = function(aColunas)
  {
    for( var i = 0, coluna ; coluna = aColunas[i++];)
    {
      this.colunas.push(coluna[0]);
      this.tiposColunas.push(coluna[1]);      
    }
  }
 
  this.adicionarLinhas = function(aLinhas)
  {
    for( var i = 0, linha ; linha = aLinhas[i++];)
    {
      this.linhas.push(linha);
    }
  }

  this.criarTabela = criarTabela;

  this.inserirLinhasTabela = inserirLinhasTabela;
}


//--------------------------------------
function criarTabela(nomeDiv,nomeTabela)
{
  var textoTabela = '<table id="' + nomeTabela + '" class="highlight responsive-table table_padrao" >';
  var formatacaoDado = [];
  
  this.nomeTabela = nomeTabela;

  textoTabela += '<thead>' + this.inserirLinhasTabela(this.colunas,"th") + '</thead><tbody>';
  
  for( var i = 0 , dados ; dados = this.linhas[i++];){
    textoTabela += this.inserirLinhasTabela( dados,"td");
  }

  textoTabela += '</tbody></table>';
  var idTableDiv = document.getElementById(nomeDiv);

  idTableDiv.innerHTML = textoTabela ;

  this.formataLinha = function(nLinha,classeCss)
  {
    $("#" + this.nomeTabela + " tr:nth-child(" + nLinha +")" ).css(classeCss);
    
        
  }

}