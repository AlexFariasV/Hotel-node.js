function notify(title, text, status) {
    new Notify ({
        status: status,
        title: title,
        text: text,
        effect: 'fade',
        speed: 300,
        customClass: 'custom-notify',
        customIcon: '',
        showIcon: true,
        showCloseButton: false,
        autoclose: true,
        autotimeout: 3000,
       /*  autotimeout: 3000000, */
        notificationsGap: null,
        notificationsPadding: null,
        type: 'outline',
        position: 'right bottom',
        customWrapper: '',
    })
}