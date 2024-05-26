function showSwal(title, message, icon, position = "center", timer = 2500) {
    console.log("swal")
    return Swal.fire({
        position: position,
        icon: icon,
        title: title,
        text: message,
        showConfirmButton: true,
        timer: timer
    });
}
