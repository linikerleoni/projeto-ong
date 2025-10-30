const menuHamburguer = document.querySelector('.menu-hamburguer');
const menuPrincipal = document.querySelector('.menu-principal');

if (menuHamburguer && menuPrincipal) {
    menuHamburguer.addEventListener('click', () => {
        menuHamburguer.classList.toggle('aberto');
        menuPrincipal.classList.toggle('aberto');
    });
}

const pageStyles = {
    'index.html': 'css/style.css',
    'cadastro.html': 'css/cadastro.css',
    'projetos.html': 'css/projetos.css'
};

function atualizarCSS(url) {
    const pageName = url.split('/').pop() || 'index.html';
    const newStyle = pageStyles[pageName] || 'css/style.css';
    const stylesheetLink = document.getElementById('page-stylesheet');

    if (stylesheetLink) {
        if (newStyle) {
            stylesheetLink.href = newStyle;
            stylesheetLink.disabled = false;
            console.log("CSS atualizado para:", newStyle);
        } else {
            stylesheetLink.href = '';
            stylesheetLink.disabled = true;
            console.log("CSS da página removido.");
        }
    } else {
        console.error("Elemento <link> com id 'page-stylesheet' não encontrado!");
    }
}

function carregarConteudo(url) {
    console.log("Tentando carregar:", url);

    atualizarCSS(url);

    const mainContainer = document.querySelector('main');
    if (!mainContainer) {
        console.error("Elemento <main> não encontrado!");
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar a página: ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const novoConteudoMain = doc.querySelector('main');

            if (novoConteudoMain) {
                mainContainer.innerHTML = novoConteudoMain.innerHTML;
                console.log("Conteúdo carregado com sucesso!");

                const pageName = url.split('/').pop() || 'index.html';
                if (pageName === 'cadastro.html') {
                    setupFormValidation();
                }

                if (pageName === 'projetos.html') {
                    renderizarProjetoDinamico();
                }

            } else {
                console.error("Tag <main> não encontrada no arquivo:", url);
                mainContainer.innerHTML = "<p>Erro: Não foi possível carregar o conteúdo.</p>";
            }
        })
        .catch(error => {
            console.error('Falha ao buscar a página:', error);
            mainContainer.innerHTML = "<p>Erro ao carregar a página. Tente novamente mais tarde.</p>";
        });
}

document.querySelectorAll('.menu-principal a').forEach(link => {
    link.addEventListener('click', (event) => {
        const urlDestino = link.getAttribute('href');

        if (!urlDestino || urlDestino.startsWith('#') || urlDestino.startsWith('javascript:') || urlDestino.startsWith('http')) {
            return;
        }

        event.preventDefault();
        history.pushState(null, '', urlDestino);
        carregarConteudo(urlDestino);

        if (menuPrincipal.classList.contains('aberto')) {
            menuHamburguer.classList.remove('aberto');
            menuPrincipal.classList.remove('aberto');
        }
    });
});

window.addEventListener('popstate', () => {
    const pageName = location.pathname.split('/').pop() || 'index.html';
    carregarConteudo(pageName);
});

const paginaInicial = location.pathname.split('/').pop() || 'index.html';
carregarConteudo(paginaInicial);


function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function setupFormValidation() {
    console.log("Configurando validação do formulário...");

    const form = document.querySelector('#form-cadastro');
    const nomeInput = document.querySelector('#nome');
    const emailInput = document.querySelector('#email');
    const telefoneInput = document.querySelector('#telefone');
    const errorContainer = document.querySelector('#form-errors');

    if (!form) {
        console.error("Formulário #form-cadastro não encontrado!");
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        console.log("Formulário enviado, validando...");

        const errors = [];
        if (errorContainer) errorContainer.innerHTML = '';

        if (!nomeInput || nomeInput.value.trim() === '') {
            errors.push('O campo "Nome completo" é obrigatório.');
        }

        if (!emailInput || emailInput.value.trim() === '') {
            errors.push('O e-mail é obrigatório');
        } else if (!isValidEmail(emailInput.value)) {
            errors.push('Porfavor, insira um e-mail válido.');
        }

        if (!telefoneInput || telefoneInput.value.trim() === '') {
            errors.push('O campo "Telefone" é obrigatório.');
        }

        if (errors.length > 0) {
            console.warn("Erros de validação:", errors);
            if (errorContainer) {
                const ul = document.createElement('ul');
                errors.forEach(error => {
                    const li = document.createElement('li');
                    li.textContent = error;
                    ul.appendChild(li);
                });
                errorContainer.appendChild(ul);
            }
        
        } else {
            console.log("Formulário válido. Enviando...");

            alert('Obrigado! Seu cadastro foi enviado com sucesso.');

            form.reset();

            carregarConteudo('index.html');
            history.pushState(null, '', 'index.html');
        }
    });
}

function renderizarProjetoDinamico() {
    console.log("Renderizando projeto dinâmico (Template JS)...");


    const container = document.querySelector('.projetos-container');


    if (!container) {
        console.error("Container '.projetos-container' não encontrado!");
        return;
    }


    const novoProjetoHTML = `
    <article class="projeto-card projeto-card1"
        <h3><strong>Adoção Virtual</strong></h3>
        <p>
        A adoção virtual é uma forma de ajudar mesmo à distância!
        Por meio desse projeto, você pode apadrinhar um cão ou gato resgatado, contribuindo mensalmente para seus cuidados com alimentação, vacinas e tratamentos veterinários.
        </p>
    </article>
    `;

    container.insertAdjacentHTML('beforeend', novoProjetoHTML);
}

console.log("main.js carregado e roteador SPA iniciado!");

function inicializarModoEscuro() {
    const toggleButton = document.getElementById('dark-mode-toggle');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            
            if (document.body.classList.contains('dark-mode')) {
                toggleButton.textContent = "Claro"; 
                toggleButton.setAttribute('aria-label', 'Alternar modo claro');
            } else {
                toggleButton.textContent = "Escuro"; 
                toggleButton.setAttribute('aria-label', 'Alternar modo escuro');
            }
        });

        
        if (document.body.classList.contains('dark-mode')) {
            toggleButton.textContent = "Claro";
        } else {
            toggleButton.textContent = "Escuro";
        }
    }
}
inicializarModoEscuro();
