// Lista de jogadores
let jogadores = ["João", "Maria", "Pedro", "Ana", "Carla", "Giovani", "Tiago", "Patricia"];

// Variável para armazenar o assassino
let assassino = "";

// Tentativas restantes
let tentativa = 6;

// Função para embaralhar jogadores e definir o assassino
function embaralharJogadores() {
    for (let i = jogadores.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [jogadores[i], jogadores[j]] = [jogadores[j], jogadores[i]];
    }
    // O primeiro jogador será o assassino
    assassino = jogadores[0]; 
    console.log("O assassino é:", assassino);
}

// Função para iniciar o jogo
function iniciarJogo() {
    // Vai esconder a seção onde tem as regras do jogo
    document.getElementById("regrasDoJogo").style.display = "none";

    // vai exibir a seção que contém os nomes, que são botões
    document.getElementById("exibirNomes").style.display = "block";

    // executa a função que vai misturar os nomes dentro da lista/array
    embaralharJogadores();
    renderizarJogadores();
}

// Função para atualizar a interface dos jogadores
function renderizarJogadores() {
    let lista = document.getElementById("nomeJogadores");
    lista.innerHTML = ""; // Limpa a lista antes de recriar

    jogadores.forEach((jogador, index) => {
        let li = document.createElement("li");
        let botao = document.createElement("button");

        botao.classList.add("botaoSelecionar");
        botao.textContent = jogador;
        botao.onclick = () => verificarJogador(index);

        li.appendChild(botao);
        lista.appendChild(li);
    });
}

// Função para verificar se o jogador escolhido é o assassino
function verificarJogador(index) {
    let jogadorSelecionado = jogadores[index];

    if (jogadorSelecionado === assassino) {

        // Não vai exibir a seção que contém os nomes, que são botões
        document.getElementById("exibirNomes").style.display = "none";
        
        
        //Exibir a seção que mostra o resultado
        document.getElementById("mensagemAcertou").style.display = "block";

        // Exibir o resultado na página HTML
        let resultadoElemento = document.getElementById("resultadoJogo");
        resultadoElemento.innerHTML = `🎉 Parabéns! Você acertou! O assassino é ${assassino}`;

        // Alterar a cor de fundo
        resultadoElemento.style.backgroundColor = "#4CAF50"; // Verde
        resultadoElemento.style.color = "white"; // Texto branco para melhor contraste
        resultadoElemento.style.padding = "15px"; // Adicionar espaço interno
        resultadoElemento.style.borderRadius = "5px"; // Bordas arredondadas
        resultadoElemento.style.textAlign = "center"; // Centralizar o texto

        // Exibir a mensagem de aviso, que vai reiniciar o jogo
        document.getElementById("container_mensagem_reinicio").style.display = "block";

        reiniciarPagina();
    } else {
     
        //Exibir a seção que mostra o resultado
        document.getElementById("mensagemAcertou").style.display = "block";

        // Exibir o resultado na pagina html
        document.getElementById("resultadoJogo").innerHTML = `❌ Você errou... ${jogadorSelecionado} não é o assassino!`;
        
        tentativa--; // Reduz a tentativa
        console.log(`Tentativas restantes: ${tentativa}`);

        jogadores.splice(index, 1); // Remove o jogador da lista
        renderizarJogadores(); // Atualiza a lista para corrigir índices

        if (tentativa === 0) {

            // Não vai exibir a seção que contém os nomes, que são botões
            document.getElementById("exibirNomes").style.display = "none";

            //Exibir a seção que mostra o resultado
            document.getElementById("mensagemAcertou").style.display = "block";

            

            // Exibir o resultado na página HTML
            let resultadoSemTentativas = document.getElementById("resultadoJogo");
            resultadoSemTentativas.innerHTML = "❌ Você perdeu... Suas tentativas acabaram!";

            // Alterar a cor de fundo
            resultadoSemTentativas.style.backgroundColor = "#FF5733"; // Vermelho
            resultadoSemTentativas.style.color = "white"; // Texto branco para melhor contraste
            resultadoSemTentativas.style.padding = "15px"; // Adicionar espaço interno
            resultadoSemTentativas.style.borderRadius = "5px"; // Bordas arredondadas
            resultadoSemTentativas.style.textAlign = "center"; // Centralizar o texto

            // Exibir a mensagem de aviso, que vai reiniciar o jogo
            document.getElementById("container_mensagem_reinicio").style.display = "block";
            
            reiniciarPagina();
        }
    }
}

// Função para reiniciar o jogo
function reiniciarPagina() {
    //  window.location.reload();
    
    setTimeout(() => {
        
        window.location.reload();

    }, 5000); // Aguarda 5 segundos antes de reiniciar
}
