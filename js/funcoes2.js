//------------------------------------
function ordenaMatriz(a, b , posicao)
{
  if (a[posicao] < b[posicao]) {
    return -1;
  }
  if (a[posicao] > b[posicao]) {
    return 1;
  }
  else
  { 
    return 0;
  }
}

//---------------------
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

//-------------------------------------------------
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
    //$("#" + this.nomeTabela + " tr:nth-child(" + nLinha +")" ).css(classeCss);
      
    var table = document.getElementById(this.nomeTabela);   
    var rows = table.getElementsByTagName("tr");  
    rows[nLinha].className = classeCss;
    
  }

  this.FormataColuna = function(tabela,ncoluna)
  {
    var minhaTabela = document.getElementById(tabela);

    var tBody = minhaTabela.tBodies[0];

    for (i = 0; i < tBody.rows.length; i++) {
        let valorTD = tBody.rows[i].cells[ncoluna].textContent;
        tBody.rows[i].cells[ncoluna].innerHTML = parseFloat(valorTD).toLocaleString('pt-BR',{ maximumFractionDigits: 2,minimumFractionDigits: 2 })
    }
  }

}

//----------------------------------
function getTotal(tabela,column=1) {
  let result = 0;
  let columns = $("#"+tabela+" tr td:nth-child(" + column + ")");

  columns.each(i => {
    result += parseInt($(columns[i]).html());
  });

  return result;
}



//----------------------------------------------------
function criaArrayTotais(nQtdeColunasValores)
{
    this.dados = [] ;
    this.linhaNova = [];     
    this.colunas=[];

    //adicionaColuna(["chave"]) ;
    //if( aColunas!= null);
    //{
    //  adicionaColunas(aColunas);
    //}

    this.adicionaColuna = function(aColunas)
    {
      for(let i = 0 ; i < aColunas.length;i++)
      {
        this.colunas.push(aColunas[i]);
      }
    }

    //---------------------------------------------------
    this.somaValorElemento = function(chave,coluna,valor)
    {
      let nPosicaoColuna =  this.colunas.indexOf(coluna) ;
      if( nPosicaoColuna === -1 )
      {
        this.colunas.push(coluna);
        nPosicaoColuna = (this.colunas.length-1);       
      }
            
      let nPosicaoLinha = getPosicaoElemento( this.dados,chave,valor) ;
      
      if ( nPosicaoLinha == null )
      {
        this.linhaNova = [chave] ;
        for(let k = 1 ; k <= nQtdeColunasValores ; k++ )
        {
          this.linhaNova.push(0);
        }

        this.dados.push(this.linhaNova);
        nPosicaoLinha = this.dados.length-1;
      }
      
      this.dados[nPosicaoLinha][nPosicaoColuna] += valor ;      
    
    }
}

//--------------------------------------------------------
function pegaPosicaoElementoMatriz(aMatriz,elemento,valor)
{
    var dados = new Object();
        dados.posicao = aMatriz.length;
        dados.valor = valor;
        dados.chave = elemento;
        
    var nPosicao = getPosicaoElemento(aMatriz,elemento) ;
    
    if( nPosicao != null )
    {
      dados.chave = elemento;
      dados.posicao = nPosicao;
      dados.valor = aMatriz[nPosicao][1] + valor;
    }
    return dados;
}

 //-------------------------------------------------
 function criaGrafico(objDados,aAnotation)
 {
     let dataTable = new google.visualization.DataTable();
     for(var i = 0 , coluna ; coluna = objDados.colunas[i++];)
     {
       dataTable.addColumn(coluna[0],coluna[1]);
     }

     if( aAnotation != null)
     {
      dataTable.addColumn(aAnotation);
     }

     dataTable.addRows( objDados.dados );

     this.desenhaGrafico = function(tipoGrafico,options,nomeDiv)
     {
        /*
        let corFundoDiv = "white";
        let corFundoGrafico = "white";
        let corFonteLabels = "black";
        let nomeFonte = "Montserrat";
        let corFonteTitulo = "blue";
        let corEtiquetas = "blue";
        let coresGraficos = ["#3366CC", "#0d47a1", "#1a237e", 'green', 'yellow', 'gray'];
        */
        
        let corFundoDiv = "#4B7A87";
        let corFundoGrafico = "#1F5A6A";
        let corFonteLabels = "white";
        let nomeFonte = "Montserrat";
        let corFonteTitulo = "white";
        let corEtiquetas = "white";
        let coresGraficos = ["#3366CC", "#0d47a1", "#1a237e", 'green', 'yellow', 'gray'];
        let tamanhoFonteEtiquetas = 12;
        let cssOcultarGrid = { gridlines:{color: "none"},textPosition:"none"};
        let cssExibirGrid = { gridlines:{color:corFundoGrafico }, textStyle: {fontName: nomeFonte,color: corFonteLabels,fontSize:tamanhoFonteEtiquetas}}
        
        let tamanhoFonteEtiquetasBarras = tamanhoFonteEtiquetas;
        if(dataTable.getNumberOfRows()>10)
        {
          tamanhoFonteEtiquetasBarras=8;
        }
        
        options.title = objDados.tituloGrafico;
        options.backgroundColor=corFundoDiv;
        options.legend = 'none';
        options.annotations = { textStyle: {color:corEtiquetas, fontName: nomeFonte,fontSize: 12}};
        options.titleTextStyle = { color: corFonteTitulo, fontName: nomeFonte,fontSize: 18, bold:'false', titlePosition:'none'};
        options.width ='90%';
        options.height = 400;
        options.colors = coresGraficos;
        options.chartArea = {'width': '90%', 'height': '70%',backgroundColor:corFundoGrafico};
        
        if(tipoGrafico=="line")
        {
          let grafico = new google.visualization.LineChart(document.getElementById(nomeDiv));
          options.pointSize = 5;
          options.hAxis = { direction:1, slantedText:true, slantedTextAngle:45,textStyle: {color:corEtiquetas,fontName: nomeFonte}};
          options.vAxis = cssOcultarGrid;
          grafico.draw(dataTable,options);

        }
        else if(tipoGrafico=="bar")
        {
          let grafico = new google.visualization.BarChart(document.getElementById(nomeDiv));
          options.vAxis = cssExibirGrid;
          options.hAxis = cssOcultarGrid;
          options.chartArea= {'width': '70%', "height": "80%",backgroundColor:corFundoGrafico,"left": "25%", "top": "15%"};
          options.vAxis.textStyle.fontSize = tamanhoFonteEtiquetasBarras ;
          options.vAxis.textPosition='out';
          grafico.draw(dataTable,options);
        }
        else if(tipoGrafico=="pie")
        {
          let grafico = new google.visualization.PieChart(document.getElementById(nomeDiv));
          options.chartArea= {'width': '60%', 'height': '70%',backgroundColor:corFundoGrafico};
          options.pieHole = 0.4;
          options.fontName = nomeFonte;
          options.pieSliceText = 'value-and-percentage';
          options.sliceVisibilityThreshold = 0;          
          options.legend = {
                              position: 'bottom',
                              labeledValueText: 'both',
                              textStyle: {color: 'white',fontSize: 14}
          };
          grafico.draw(dataTable,options);
        }
        else if(tipoGrafico=="column")
        {
          let grafico = new google.visualization.ColumnChart(document.getElementById(nomeDiv));
          options.vAxis = cssOcultarGrid;
          options.hAxis = cssExibirGrid;
          options.chartArea = {'width': '80%', 'height': '70%',backgroundColor:corFundoGrafico};
          options.legend = 'none';
          grafico.draw(dataTable,options);
        }

      }

 }
