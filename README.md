# Projeto ONG Reconhecer e Cuidar (Front-End)

> Projeto de site institucional responsivo para uma ONG fictícia de resgate de cães e gatos, focado em implementar uma arquitetura SPA (Single Page Application) e boas práticas de desenvolvimento front-end.
>
> Desenvolvido como avaliação para a cadeira de Desenvolvimento Front-End Web (Turma_003).

**[Acesse a versão ao vivo do site (GitHub Pages)](https://linikerleoni.github.io/projeto-ong/)**

---

##  Funcionalidades Principais (Features)

* **Single Page Application (SPA):** Navegação fluida entre as páginas (Home, Projetos, Cadastro) sem recarregar o navegador, utilizando a History API do JavaScript.
* **Modo Escuro Acessível:** Um botão de toggle no header que alterna o tema do site para um modo de alto contraste (Modo Escuro), com todas as seções adaptadas.
* **Validação de Formulário:** Verificação de consistência de dados (campos vazios, e-mail válido) no formulário de "Seja Voluntário" antes do envio, com feedback para o usuário.
* **Templates JavaScript:** O card "Adoção Virtual" na página de Projetos é 100% gerado e injetado dinamicamente pelo JavaScript, como prova de conceito de "templating".
* **Layout Responsivo:** O site se adapta a telas de desktop, tablets e celulares.
* **Otimização:** Todos os arquivos CSS e JS estão minificados, e as imagens foram comprimidas para um carregamento mais rápido.
* **Acessibilidade (WCAG):** O site implementa `aria-label`s para leitores de tela e um estado de `:focus` visível para navegação via teclado.

---

## Tecnologias Utilizadas

* **HTML5** (Estrutura semântica)
* **CSS3** (Estilização responsiva, Grid, Flexbox, Variáveis CSS)
* **JavaScript (ES6+)** (Manipulação do DOM, Eventos, Fetch API, SPA)
* **Git & GitHub** (Controle de versão)

---

## 📦 Como Rodar o Projeto Localmente

Para rodar este projeto no seu computador, siga os passos abaixo:

```bash
# 1. Clone o repositório
git clone [https://github.com/linikerleoni/projeto-ong.git](https://github.com/linikerleoni/projeto-ong.git)

# 2. Entre na pasta do projeto
cd projeto-ong

# 3. Abra com o VS Code
code .