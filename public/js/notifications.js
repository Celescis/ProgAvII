function setToast(status, title, message) {
  new Notify({
      status: status,  // 'success', 'error', 'warning', 'info'
      title: title,
      text: message,
      effect: 'slide',
      speed: 300,
      customClass: '',
      customIcon: '',
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'right top'
  });
}