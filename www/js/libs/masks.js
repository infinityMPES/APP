/**
 * Iniciando ao carregar a página
 */
$(document).ready(function(){
	// Iniciando as mascaras 2s depois do carregamento
	setTimeout(function(){
		definirMascaras()
	},2000);
	
	// Para cada troca de tela
	$("a.links").on("click", function(){
		setTimeout(function(){
			console.log("aqui");
			definirMascaras();
		},2000);
	});
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
	$('.ddd_tel').mask('(00) 0000-00000');
	$('.cpf').mask('000.000.000-00');
	$('.cnpj').mask('00.000.000/0000-00');
	$('.dinheiro').mask('000.000.000.000.000,00' , { reverse : true});
	$('.dinheiro2').mask("#.##0,00" , { reverse:true});
}