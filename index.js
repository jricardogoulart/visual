document.addEventListener('DOMContentLoaded', function () {
    const tituloElement = document.getElementById('titulo');
    const texto = tituloElement.innerText;
    tituloElement.innerText = '';

    function animarTexto() {
        setTimeout(() => {
            for (let i = 0; i < texto.length; i++) {
                setTimeout(() => {
                    tituloElement.innerText += texto[i];
                }, 300 * i);
            }
        }, 1000);
    }

    animarTexto();
});