# Wayne Premium (FINAL) - Projeto

Conteúdo incluído nesta versão final:
- Login com roles (admin, gerente, seguranca, funcionario)
- Autenticação + função authorize(allowedRoles)
- Dashboard com CRUD (add/edit/remove), busca e filtro por tipo
- Estatísticas e gráfico (Chart.js)
- Página protegida: pages/seguranca.html
- Estilos premium, animações e correções no input de busca
- Dados salvos localmente em localStorage (sem backend)

## Como usar

1. Extraia o ZIP para uma pasta (ex: Documentos/wayne-premium-final).
2. Abra o **VS Code** → Arquivo → Abrir Pasta → selecione a pasta extraída.
3. Instale a extensão **Live Server** (se não tiver).
4. Clique com o botão direito em `index.html` → **Open with Live Server**.
5. Login demo:
   - Admin: bruce@wayne.com / batman123
   - Gerente: gordon@wayne.com / gordon123
   - Segurança: lucius@wayne.com / lucius123
   - Funcionário: alfred@wayne.com / alfred123

## Observações
- Se já tiver sessão salva, limpe localStorage (DevTools → Application → Local Storage) ou use janela anônima.
- Em produção, autenticação e autorização devem ser feitas no servidor. Este projeto é uma demo local.
