
function changeImage(miniatura,alvo) {
    var mainImage = document.getElementById(alvo).querySelector('img');
    mainImage.src = miniatura.src;
    mainImage.alt = miniatura.alt;
}