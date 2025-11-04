# 🦇 Wayne Premium — Sistema de Gerenciamento Interno

> Projeto final de aplicação web Full Stack (versão localStorage)

---

## 🧭 Sobre o Projeto

O **Wayne Premium** é um sistema de gerenciamento interno desenvolvido para simular o controle de **recursos corporativos** das *Indústrias Wayne* — como equipamentos, veículos e dispositivos de segurança.

A aplicação permite o **cadastro, edição e exclusão** de recursos, além de oferecer um **sistema de autenticação e autorização** com diferentes níveis de acesso:

- 👨‍💼 **Funcionário** – acesso básico ao sistema  
- 🧰 **Gerente** – pode editar e aprovar recursos  
- 🛡️ **Segurança** – acesso à área restrita de monitoramento  
- 🦸 **Administrador** – controle total de usuários e dados

---

## 🚀 Funcionalidades Principais

✅ Login com validação de credenciais  
✅ Controle de acesso por função (authorization)  
✅ Dashboard com busca, filtro e gráfico dinâmico  
✅ CRUD completo de recursos (add, edit, remove)  
✅ Estatísticas visuais e contadores interativos  
✅ Tema claro/escuro (modo noturno automático)  
✅ Salvamento local via `localStorage`  
✅ Interface moderna com animações suaves

---

## 🧩 Tecnologias Utilizadas

| Camada | Tecnologia |
|:--|:--|
| Estrutura | **HTML5** |
| Estilo e UI | **CSS3 (Flexbox / Grid / Animations)** |
| Lógica e dados | **JavaScript (Vanilla)** |
| Gráficos | **Chart.js** |
| Alerta e feedback | **SweetAlert2** |
| Armazenamento local | **localStorage** |
| Versionamento | **Git + GitHub** |

---

## 🧠 Estrutura do Projeto

wayne-premium/
│
├── index.html # Página inicial
├── style.css # Estilos e temas
├── script.js # Lógica principal
│
├── assets/
│ └── logo.png # Logotipo da aplicação
│
└── pages/
├── login.html # Tela de login
├── dashboard.html # Painel de controle
└── seguranca.html # Área restrita (Segurança/Admin)


---

 * Como Executar Localmente

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/SeuUsuario/wayne-premium.git
cd wayne-premium

| Usuário        | E-mail                                      | Senha     | Permissão   |
| :------------- | :------------------------------------------ | :-------- | :---------- |
| 🦸 Bruce Wayne | [bruce@wayne.com](mailto:bruce@wayne.com)   | batman123 | admin       |
| 🧰 Gordon      | [gordon@wayne.com](mailto:gordon@wayne.com) | gordon123 | gerente     |
| 🛡️ Lucius     | [lucius@wayne.com](mailto:lucius@wayne.com) | lucius123 | seguranca   |
| 👨‍🍳 Alfred   | [alfred@wayne.com](mailto:alfred@wayne.com) | alfred123 | funcionario |


| Página / Função                      | Quem Pode Acessar                |
| :----------------------------------- | :------------------------------- |
| Login                                | Todos                            |
| Dashboard                            | Todos os usuários logados        |
| Área de Segurança (`seguranca.html`) | Apenas **admin** e **seguranca** |
| Adicionar / Editar Recursos          | Todos                            |
| Aprovar / Excluir Recursos           | Somente **admin** e **gerente**  |

Destaques Visuais

✨ Interface com tema escuro e elementos em tons de azul petróleo
🌗 Alternância entre modo claro e escuro
📊 Gráficos dinâmicos de recursos
🔍 Campo de busca funcional com ícone de lupa
💬 Alertas amigáveis via SweetAlert2

📚 Objetivo Acadêmico

Este projeto foi desenvolvido como trabalho final do curso de Programação Web Full Stack, aplicando os conceitos de:

Front-end responsivo e modular

Manipulação do DOM e eventos

Armazenamento local (localStorage)

Autenticação e autorização de usuários

Organização e versionamento com Git e GitHub

🧑‍💻 Autor

Henrique Hernandes
Desenvolvedor Web
📧 [henriquehernandesramos@gmail.com]

🔗 github.com/seuusuario

🏁 Licença

Projeto desenvolvido para fins educacionais.
© 2025 - Todos os direitos reservados

