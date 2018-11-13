/**
 * Iniciando ao carregar a página
 */
$(document).ready(function(){
	// Iniciando as mascaras 2s depois do carregamento
	setInterval(function(){
		definirMascaras()
		
		 $('.apenasLetras').keydown(function (e) {
			 console.log("letras")
	          if (e.shiftKey || e.ctrlKey || e.altKey) {
	              e.preventDefault();
	          } else {
	              var key = e.keyCode;
	              if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
	                  e.preventDefault();
	              }
	          }
	      });
	},1000);
	
});

/**
 * Definindo as mascaras
 */
function definirMascaras(){
	$('.data').mask('00/00/0000');
	$('.tempo').mask('00:00:00');
	$('.data_tempo').mask('00/00/0000 00:00:00');
	$('.cep').mask('00000-000');
	$('.tel').mask('00000-0000');
	$('.ddd_tel').mask('(00) 00000-0000');
	$('.cpf').mask('000.000.000-00');
	$('.cnpj').mask('00.000.000/0000-00');
	$('.dinheiro').mask('000.000.000.000.000,00' , { reverse : true});
	$('.dinheiro2').mask("#.##0,00" , { reverse:true});
}