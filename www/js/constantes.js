/**
 * Constantes do APP
 * @autor Alberto Medeiros <albertomedeiros214@gmail.com>
 */
var Constantes = {

	// STORAGE		
		
	"APP_TIMEOUT"	 					: 30000,
	"APP_DATABASE_NAME"	 				: "imip_oncologia",
	"APP_DATABASE_NAME_DISPLAY"			: "Imip Oncologia",
	"APP_ID"	 						: "08582d2d-8cb3-4ca3-9c3d-b86be7ec5e8b",
	"APP_VERSAO" 						: "0.1.0",
	
	// BASE
	"APP_BASE"	 						: "imip",
	"APP_BASE_TITULO"	 				: "Conxão Vida",
	
//	"APP_SERVICE"						: "http://conexaovidaimip.com.br/prod/",
	"APP_SERVICE"						: "http://conexaovidaimip.com.br/dev/",
//	"APP_SERVICE"						: "http://conexaovidaimip.com.br/teste/",
//	"APP_SERVICE"						: "http://localhost/imip/ws-imip-dois/ws/",
	
	"APP_MSG_ERROR"						: "<center><span class='icon ion-android-alert' style='font-size:35px'></span><br>Ops...<br>Sem Conex�o!</center>",
	"APP_MSG_TIMEOUT"					: "<center><span class='icon ion-android-alert' style='font-size:35px'></span><br>Ops...<br>Sem Conex�o!</center>",
	
	// SERVICOS
	/****** MÓDULO USUÁRIO ********/
	"APP_SERVICE_USUARIO_LOGIN"					: "usuario/login",
	"APP_SERVICE_USUARIO_ENVIAR_SENHA"			: "usuario/esqueciSenha",
	"APP_SERVICE_CADASTRAR_PACIENTE"			: "usuario/cadastrarPaciente",
	"APP_SERVICE_EXISTE_CPF"					: "usuario/existeEmail",
	"APP_SERVICE_EXISTE_EMAIL"					: "usuario/existeCpf",
	"APP_SERVICE_VALIDAR_CADASTRO"				: "usuario/validarCadastro",
	"APP_SERVICE_LISTAR_PERFIS"					: "usuario/listaPerfis",
	"APP_SERVICE_LISTAR_CANCER"					: "usuario/listaCancer",
	"APP_SERVICE_LISTAR_CIDADE"					: "usuario/listarCidades",
	"APP_SERVICE_PESQUISAR_USUARIOS"			: "usuario/pesquisarUsuarios",
	"APP_SERVICE_RECUPERAR_USUARIO_POR_ID"		: "usuario/recuperarUsuarioPorId",
	"APP_SERVICE_EDITAR_USUARIO"				: "usuario/editarUsuario",
	"APP_SERVICE_CADASTRAR_USUARIO"				: "usuario/cadastrarUsuario",
	/****** FIM MÓDULO USUÁRIO ********/
	
	/****** MÓDULO DE EXAMES *******/
	"APP_SERVICE_EXAMES_LISTAR_AREAS"			: "exame/listarAreas",
	"APP_SERVICE_EXAMES_LISTAR_TIPOS_EXAMES"	: "exame/listarTiposExames",
	"APP_SERVICE_EXAMES_CADASTRAR"				: "exame/cadastrarExame",
	"APP_SERVICE_EXAMES_REUPERAR_PREVISAO_EXAME": "exame/previsaoPorTipoExame",
	"APP_SERVICE_EXAMES_LISTAR_EXAMES_USUARIO"	: "exame/listarExamesDoUsuarioPorId",
	"APP_SERVICE_EXAMES_FILTRAR_EXAMES"			: "exame/filtrarExames",
	"APP_SERVICE_EXAMES_LISTAR_TOTAIS_AREA"		: "exame/listarTotalExamePorArea",
	"APP_SERVICE_EXAMES_LISTAR_TOTAIS_TIPO"		: "exame/listarTotalExamePorTipoExame",
	"APP_SERVICE_EXAMES_CONFIRMAR_RECEBIMENTO"  : "exame/confirmarRecebimento",
	"APP_SERVICE_EXAMES_RECUPERAR_EXAME_ID"  	: "exame/recuperarExamePorID",
	/****** FIM MÓDULO DE EXAMES *******/
	
	/****** MÓDULO DE NOTIFICAÇÕES *******/
	"APP_SERVICE_NOTIFICACOES_LISTAR_USUARIO"	: "notificacao/notificacoesDoUsuarioPorId",
	"APP_SERVICE_NOTIFICACOES_BUSCAR_TOTAL"		: "notificacao/filtrarTotalUsuariosEnvio",
	"APP_SERVICE_NOTIFICACOES_CADASTRAR"		: "notificacao/cadastrarNotificacao",
	"APP_SERVICE_NOTIFICACOES_FILTRAR"			: "notificacao/filtrarNotificacoes",
	"APP_SERVICE_NOTIFICACOES_SETAR_LIDA"		: "notificacao/notificacoesLidas",
	"APP_SERVICE_NOTIFICACOES_PERFIS"			: "notificacao/listaPerfis",
	"APP_SERVICE_NOTIFICACOES_CANCER"			: "notificacao/listaCancer",
        "APP_SERVICE_NOTIFICACOES_POR_ID"			: "notificacao/recuperarNotificacaoPorID",
	/****** FIM MÓDULO DE NOTIFICAÇÕES *******/
	
	"APP_SERVICE_INICIO"						: "inicio",
	"APP_SERVICE_PARAMETRO"						: "parametro",
	"APP_SERVICE_ENVIAR_SENHA"					: "enviar-senha",
	"APP_SERVICE_ENVIAR_MENSAGEM"				: "ChatBot/enviarMensagem",
    
}