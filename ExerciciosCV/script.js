const arquivos = [
    "ProjetoCalculadora.py",
    "AreaCirculo.py",
    "AreaEsfera.py",
    "ParImpar.py"
];

const container = document.getElementById("projetos-container");

// Função para executar o código
function executar(botao) {
    const exContainer = botao.parentElement;
    const codigo = exContainer.querySelector('.codigo').value;
    const resultado = exContainer.querySelector('.resultado');
    const inputDiv = exContainer.querySelector('.input-area');

    function outf(text) {
        resultado.textContent += text + '\n';
        resultado.scrollTop = resultado.scrollHeight; // rolar sempre para baixo
    }

    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "Arquivo não encontrado: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    }

    // Fila de promessas de input
    let inputResolve = null;

    Sk.configure({
        output: outf,
        read: builtinRead,
        inputfun: function(promptText) {
            return new Promise((resolve) => {
                inputResolve = resolve;
                resultado.textContent += (promptText || "Digite: ") + "\n";
                inputDiv.style.display = "block";
                inputDiv.querySelector("input").focus();
            });
        },
        inputfunTakesPrompt: true
    });

    resultado.textContent = '';
    inputDiv.style.display = "none";

    Sk.misceval.asyncToPromise(() => {
        return Sk.importMainWithBody("<stdin>", false, codigo, true);
    }).catch(err => {
        resultado.textContent += err.toString();
    });

    // Captura envio do input
    const inputField = inputDiv.querySelector("input");
    const inputBtn = inputDiv.querySelector("button");
    inputBtn.onclick = () => {
        if (inputResolve) {
            const val = inputField.value;
            inputField.value = "";
            inputDiv.style.display = "none";
            resultado.textContent += val + "\n";
            inputResolve(val);
            inputResolve = null;
        }
    };
    inputField.onkeydown = (e) => {
        if (e.key === "Enter") {
            inputBtn.click();
        }
    };
}

// Função para ajustar altura do textarea
function ajustarAltura(textarea) {
    textarea.style.height = 'auto';
    const alturaMin = 50;
    const alturaMax = 400;
    const novaAltura = Math.min(Math.max(textarea.scrollHeight, alturaMin), alturaMax);
    textarea.style.height = novaAltura + 'px';
}

// Carregar exercícios
async function carregarExercicios() {
    for (const nome of arquivos) {
        try {
            const res = await fetch(`arquivospy/${encodeURIComponent(nome)}`);
            if (!res.ok) throw new Error(`Erro ao carregar ${nome}: ${res.status}`);
            const codigo = await res.text();

            const exDiv = document.createElement('div');
            exDiv.classList.add('exercicio');

            exDiv.innerHTML = `
                <h2>${nome}</h2>
                <textarea class="codigo">${codigo}</textarea><br>
                <button onclick="executar(this)">Executar</button>
                <pre class="resultado"></pre>
                <div class="input-area" style="display:none; margin-top:5px;">
                    <input type="text" placeholder="Digite aqui" />
                    <button>Enviar</button>
                </div>
            `;
            container.appendChild(exDiv);

            const textarea = exDiv.querySelector('.codigo');
            ajustarAltura(textarea);
            textarea.addEventListener('input', () => ajustarAltura(textarea));

        } catch (err) {
            console.error(err);
        }
    }
}

carregarExercicios();
