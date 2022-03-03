// Brazilian portuguese language translation
function language() {
$(document).ready(function() {
	// Window title
	$("title").text("Regata OS Update");

	// Title
	$("h1").text("Regata OS Update");

	// Sidebar menu
	$(".home").attr({title:"Atualizações"});
	$(".historic").attr({title:"Histórico de atualizações"});
	$(".settings").attr({title:"Configurações"});

	// "Update all" or "cancel updates" buttons
	$(".update-all-button1").text("Atualizar tudo");
	$(".update-all-button2").text("Cancelar");

	// Descriptions
	$(".check-up").text("Verificando atualizações...");
	$(".no-up").text("Não há atualizações disponíveis.");
	$(".never-up").text("Nunca procurar por atualizações do sistema!");
	$(".yes-up").text("Atualizações disponíveis!");
	$(".updated").text("Atualizado!");
	$(".search-update-status").text("Isso pode levar alguns minutos!");
	$(".not-up-auto").text("Atualização automática desativada.");
	$(".yes-update-auto").text("Atualização automática ativada.");

	// Updates buttons and status
	$(".other-updates .app-name").text("Atualizações do sistema");
	$(".more-details-text").text("Mais detalhes");
	$("#update-app-other-updates").text("Atualizar");

	$(".app-status-pending").text("Pendente...");
	$(".app-status-download").text("Baixando...");
	$(".app-status-install").text("Instalando...");
	$(".app-status-concluded").text("Concluído!");
	$("#check-updates-button").text("Verificar atualizações");
	$("#check-updates-button-title").text("Tudo pronto");
	$("#check-updates-button-desc").text("Todos os apps estão atualizados");

	setTimeout(function(){
		$(".update-app").text("Atualizar");
		$(".cancel-app").text("Cancelar");
		$(".open-app").text("Abrir");
	}, 200);

	// Updated apps page
	$(".apps-updated").text("Aplicativos atualizados recentemente");

	// Settings
	$(".apps-settings").text("Configurações");
	$(".up-apps-auto").text("Atualizações automáticas");
	$(".selectnav .up-on").text("Atualizar o sistema automaticamente");
	$(".selectnav .up-only").text("Apenas procurar por atualizações");
	$(".selectnav .up-off").text("Nunca procurar por atualizações");
});
}

language();
