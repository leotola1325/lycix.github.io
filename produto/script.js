javascript
document.getElementById('couponForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const validCoupons = ['DESCONTO10', 'FRETEGRATIS', 'PROMO2024'];
    const couponInput = document.getElementById('couponCode').value.trim();
    const messageElement = document.getElementById('message');

    if (validCoupons.includes(couponInput.toUpperCase())) {
        messageElement.textContent = 'Cupom aplicado com sucesso!';
        messageElement.className = 'message success';
    } else {
        messageElement.textContent = 'Cupom inválido. Por favor, tente novamente.';
        messageElement.className = 'message error';
    }
});
function postarAvaliacao() {
    const rating = document.querySelector('input[name="rating"]:checked');
    const comentarioTexto = document.getElementById('comentario').value.trim();

    if (!rating) {
        alert("Por favor, selecione uma avaliação com estrelas.");
        return;
    }
    if (comentarioTexto === "") {
        alert("Por favor, escreva sua avaliação antes de postar.");
        return;
    }

    const novaAvaliacao = document.createElement("div");
    novaAvaliacao.classList.add("comment");

    const estrelas = '★'.repeat(rating.value) + '☆'.repeat(5 - rating.value);
    const estrelasP = document.createElement("p");
    estrelasP.innerHTML = `Avaliação: ${estrelas}`;
    novaAvaliacao.appendChild(estrelasP);

    const comentarioP = document.createElement("p");
    comentarioP.textContent = comentarioTexto;
    novaAvaliacao.appendChild(comentarioP);

    document.querySelector(".comments").insertBefore(novaAvaliacao, document.querySelector(".comment-box"));

    document.getElementById("comentario").value = "";
    document.querySelectorAll('input[name="rating"]').forEach(input => input.checked = false);
}

const sizeButtons = document.querySelectorAll('.size-button');
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

function alterarQuantidade(valor) {
    let campo = document.getElementById('quantidade');
    let quantidadeAtual = parseInt(campo.value);
    if (quantidadeAtual + valor > 0 && quantidadeAtual + valor <= 20) {
        campo.value = quantidadeAtual + valor;
    }
}

function comprar() {
    alert('Compra realizada com sucesso!');
}

function adicionarCarrinho() {
    alert('Item adicionado ao carrinho!');
}