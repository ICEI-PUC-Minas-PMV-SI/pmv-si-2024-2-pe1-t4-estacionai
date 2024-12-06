const idUser = localStorage.getItem("userId");

if (!idUser) {
    window.location.href = "./login.html";
}