function notify(titulo,  texto, tipo,posicao,duracao=3000) {
    new Notify({
        status: tipo,
        title: titulo,
        text:texto,
        effect: 'fade',
        speed: 500,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: duracao,
        gap: 20,
        distance: 20,
        type: 1,
        position: "center", 
        customWrapper: '',
    })
}