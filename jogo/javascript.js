const lojaButton = document.getElementById('lojaButton');
const lojaDiv = document.getElementById('loja');
const fecharLoja = document.getElementById('fechar-loja');
const personagem = document.getElementById('personagem');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const pontuacaoDiv = document.getElementById('pontuacao');
const titulo = document.getElementById('titulo');
const obstaculo = document.getElementById('obstaculo');
const obstaculoneve = document.getElementById('obstaculoneve');
const obstaculoExtra = document.createElement('div'); // Novo obstáculo
const moeda = document.getElementById('moeda');
const moneyDisplay = document.getElementById('money');

obstaculoExtra.id = 'obstaculoExtra';
document.body.appendChild(obstaculoExtra); // Adiciona o novo obstáculo ao corpo da página

let isJumping = false;
let isGameOver = false;
let gameStarted = false;
let obstaculos = [obstaculo, obstaculoneve, obstaculoExtra]; // Array com todos os obstáculos
let detectarColisaoIntervalo;
let pontuacao = 0;
let tempoDecorrido = 0;
let contador = 0; // Contador de moedas
let jogoIniciado = true; // Flag para verificar se o jogo foi iniciado 



// Elementos de nuvens e pássaros
const nuvens = [document.getElementById('nuvem1'), document.getElementById('nuvem2'), document.getElementById('nuvem3')];
const passaros = document.getElementById('passaros');
let posicoesPausadas = [];

// Função para o personagem pular
function pular() {
    if (!isJumping) {
        isJumping = true;
        personagem.style.transition = 'bottom 0.6s ease-in-out';
        personagem.style.bottom = '375px';

        setTimeout(() => {
            personagem.style.transition = 'bottom 0.6s ease-in-out';
            personagem.style.bottom = '160px';

            setTimeout(() => {
                isJumping = false;
            }, 600);
        }, 600);
    }
}

lojaButton.addEventListener('click', () => {
    lojaDiv.style.display = 'flex'; // Exibe a tela da loja
    lojaButton.style.display = 'none'; // Esconde o botão da loja enquanto o jogo estiver ativo
});

// Fecha a tela da loja
fecharLoja.addEventListener('click', () => {
    lojaDiv.style.display = 'none'; // Esconde a tela da loja
    lojaButton.style.display = 'block'; // Exibe novamente o botão da loja
});



function detectarColisaoMoeda() {
    const personagemPos = personagem.getBoundingClientRect();
    const moedaPos = moeda.getBoundingClientRect();

    // Verifica se o personagem colidiu com a moeda
    if (
        personagemPos.left < moedaPos.right &&
        personagemPos.right > moedaPos.left &&
        personagemPos.top < moedaPos.bottom &&
        personagemPos.bottom > moedaPos.top
    ) {
        // A moeda foi coletada, aumenta o contador somente se o jogo estiver iniciado
        if (jogoIniciado) {
            contador++;
            moneyDisplay.innerText = 'Moeda: ' + contador + 'x'; // Atualiza o contador de moedas
        }

        // Oculta a moeda coletada
        moeda.style.display = 'none';

        // Cria uma nova moeda após um pequeno delay
        setTimeout(reposicionarMoeda, 300); // Atraso para criar a nova moeda
    }
}

// Função para reposicionar a moeda (mantendo a animação e posição original)
function reposicionarMoeda() {
    moeda.style.display = 'block'; // Torna a moeda visível novamente

    // Reinicia a animação da moeda para a posição inicial
    moeda.style.animation = 'none';
    moeda.offsetHeight; // Força o reflow para reiniciar a animação
    moeda.style.animation = 'obstaculo-animation 4s linear infinite'; // Reaplica a animação

    // A moeda volta para a posição inicial da animação
    moeda.style.right = '-1500px'; // Reinicia a posição à esquerda
    moeda.style.bottom = '310px';  // Mantém a posição fixa na parte inferior
}

// Função para iniciar o jogo
function iniciarJogo() {
    jogoIniciado = true; // Ativa o contador
    moneyDisplay.innerText = 'Moeda: ' + contador + 'x'; // Exibe o contador de moedas no início

    // Começa a animação da moeda
    moeda.style.animationPlayState = 'running';
}

// Função para pausar o jogo
function pausarJogo() {
    jogoIniciado = false; // Pausa o contador
    moeda.style.animationPlayState = 'paused'; // Pausa a animação da moeda
}

// Verifica colisão a cada 50ms
setInterval(detectarColisaoMoeda, 50);



// Função para detectar colisão na metade da imagem do personagem
function detectarColisao() {
    const personagemPos = personagem.getBoundingClientRect();
    const personagemMetade = personagemPos.left + personagemPos.width / 3; // Define a metade da imagem do personagem

    obstaculos.forEach((obstaculo) => {
        const obstaculoPos = obstaculo.getBoundingClientRect();

        // Checa a colisão entre a metade do personagem e o obstáculo
        if (
            personagemMetade < obstaculoPos.right &&
            personagemMetade > obstaculoPos.left &&
            personagemPos.bottom > obstaculoPos.top &&
            personagemPos.top < obstaculoPos.bottom
        ) {
            isGameOver = true;
            clearInterval(detectarColisaoIntervalo);
            exibirGameOver();
            setTimeout(() => {
                restartButton.style.display = 'block'; // Exibe o botão de reiniciar  
            }, 100);
        }
    });
}

// Função para exibir o título de Game Over e mostrar a pontuação
function exibirGameOver() {
    const gameOverTitle = document.createElement('h2');
    gameOverTitle.classList.add('game-over');
    gameOverTitle.innerText = 'Game Over';
    document.body.appendChild(gameOverTitle);

    // Exibe a pontuação no centro da tela
    pontuacaoDiv.classList.add('pontuacao-game-over');
    
    // Pausa as animações de nuvens e pássaros
    pausarAnimacoes();
}

// Função para iniciar o jogo
function iniciarJogo() {
    gameStarted = true;
    titulo.style.display = 'none'; // Esconde o título ao iniciar o jogo
    startButton.style.display = 'none'; // Esconde o botão de iniciar
    lojaButton.style.display = 'none'; // Esconde o botão da loja ao iniciar o jogo
    obstaculo.style.display = 'block'; // Exibe o obstáculo
    obstaculoneve.style.display = 'block'; // Exibe o obstáculo de neve
    obstaculoExtra.style.display = 'block'; // Exibe o novo obstáculo

    // Configura a velocidade dos obstáculos e distâncias
    obstaculo.style.animationDuration = '4s';
    obstaculoneve.style.animationDuration = '4s';
    obstaculoExtra.style.animationDuration = '4s';
    obstaculo.style.right = '-100px';
    obstaculoneve.style.right = '-200px';
    obstaculoExtra.style.right = '-300px';

    detectarColisaoIntervalo = setInterval(detectarColisao, 50); // Verificação de colisão

    // Atualiza a pontuação a cada segundo
    setInterval(() => {
        if (gameStarted && !isGameOver) {
            tempoDecorrido++;
            pontuacaoDiv.innerHTML = 'Pontuação: ' + tempoDecorrido; // Atualiza a pontuação
        }
    }, 70);
}
// Configurações iniciais de velocidade e posição
const velocidadeInicialPulo = 0.6; // Tempo do pulo, em segundos
const velocidadeInicialObstaculos = 4; // Duração da animação dos obstáculos, em segundos
const incrementoVelocidade = 0.08; // Incremento na velocidade

let contagemSaidaObstaculos = [0, 0, 0]; // Contador de saídas para cada obstáculo

// Função para definir a velocidade inicial e posição dos elementos
function definirVelocidadeInicial() {
    personagem.style.transition = `bottom ${velocidadeInicialPulo}s ease-in-out`;
    obstaculo.style.animationDuration = `${velocidadeInicialObstaculos}s`;
    obstaculoneve.style.animationDuration = `${velocidadeInicialObstaculos}s`;
    obstaculoExtra.style.animationDuration = `${velocidadeInicialObstaculos}s`;

    // Reseta a posição dos obstáculos para fora da tela
    obstaculo.style.right = '-100px';
    obstaculoneve.style.right = '-200px';
    obstaculoExtra.style.right = '-300px';
}

// Função para aumentar a velocidade dos elementos e reiniciar a animação
function aumentarVelocidade() {
    let novaVelocidadePulo = parseFloat(personagem.style.transition.match(/[\d.]+/)) - incrementoVelocidade;
    let novaVelocidadeObstaculos = parseFloat(obstaculo.style.animationDuration) - incrementoVelocidade;

    // Aplica as novas velocidades
    personagem.style.transition = `bottom ${novaVelocidadePulo}s ease-in-out`;
    obstaculo.style.animationDuration = `${novaVelocidadeObstaculos}s`;
    obstaculoneve.style.animationDuration = `${novaVelocidadeObstaculos}s`;
    obstaculoExtra.style.animationDuration = `${novaVelocidadeObstaculos}s`;

    // Reinicia a animação para garantir que os obstáculos comecem de fora da tela
    obstaculo.style.animation = 'none';
    obstaculoneve.style.animation = 'none';
    obstaculoExtra.style.animation = 'none';
    setTimeout(() => {
        obstaculo.style.animation = '';
        obstaculoneve.style.animation = '';
        obstaculoExtra.style.animation = '';
    }, 10);
}

// Função para verificar e aumentar a velocidade a cada 2 saídas
function registrarSaidaObstaculo(index) {
    contagemSaidaObstaculos[index]++;
    if (contagemSaidaObstaculos[index] === 1) {
        aumentarVelocidade();
        contagemSaidaObstaculos[index] = 0; // Reseta o contador do obstáculo
    }
}

// Evento de animação para detectar quando cada obstáculo completa uma saída
obstaculo.addEventListener('animationiteration', () => registrarSaidaObstaculo(0));
obstaculoneve.addEventListener('animationiteration', () => registrarSaidaObstaculo(1));
obstaculoExtra.addEventListener('animationiteration', () => registrarSaidaObstaculo(2));

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Reseta a pontuação e o estado do jogo
    pontuacao = 0;
    tempoDecorrido = 0;
    isGameOver = false;
    contagemSaidaObstaculos = [0, 0, 0]; // Reseta o contador de saídas

    restartButton.style.display = 'none'; // Oculta o botão de reiniciar
    lojaButton.style.display = 'none'; 

    definirVelocidadeInicial(); // Restaura as velocidades iniciais

    retomarAnimacoes(); // Retoma as animações
    detectarColisaoIntervalo = setInterval(detectarColisao, 50); // Reinicia a detecção de colisão
}

// Define a velocidade inicial ao carregar o jogo
definirVelocidadeInicial();

// Inicia o jogo ao clicar no botão de iniciar
startButton.addEventListener('click', iniciarJogo);

// Reinicia o jogo ao clicar no botão de reiniciar
restartButton.addEventListener('click', reiniciarJogo);

// Função para pausar animações de nuvens e pássaros
function pausarAnimacoes() {
    posicoesPausadas = [];
    
    [...nuvens, passaros].forEach((elemento) => {
        const estilo = window.getComputedStyle(elemento);
        const posicaoDireita = estilo.getPropertyValue('right'); // Posição da direita ao pausar
        posicoesPausadas.push(posicaoDireita);
        elemento.style.animationPlayState = 'paused'; // Pausa a animação
        elemento.style.right = posicaoDireita; // Define a posição atual
    });
}

// Função para retomar animações de nuvens e pássaros
function retomarAnimacoes() {
    [...nuvens, passaros].forEach((elemento, index) => {
        elemento.style.right = posicoesPausadas[index]; // Continua da posição onde parou
        elemento.style.animationPlayState = 'running'; // Retoma a animação
    });
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Remove o texto de Game Over, se presente
    const gameOverTitle = document.querySelector('.game-over');
    if (gameOverTitle) {
        gameOverTitle.remove();
    }

    pontuacaoDiv.classList.remove('pontuacao-game-over');
    pontuacao = 0;
    tempoDecorrido = 0;
    isGameOver = false;

    restartButton.style.display = 'none'; // Oculta o botão de reiniciar
    lojaButton.style.display = 'none'; 
    // Retoma as animações de nuvens e pássaros na posição que pararam
    retomarAnimacoes();

    detectarColisaoIntervalo = setInterval(detectarColisao, 50); // Reinicia a detecção de colisão
}

// Evento de pulo ao pressionar a tecla espaço
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        pular();
    } else if (event.code === 'KeyR' && isGameOver) { // Reinicia o jogo ao pressionar 'R' se estiver em Game Over
        reiniciarJogo();
    }
});


// Inicia o jogo ao clicar no botão de iniciar
startButton.addEventListener('click', iniciarJogo);

// Reinicia o jogo ao clicar no botão de reiniciar
restartButton.addEventListener('click', reiniciarJogo);