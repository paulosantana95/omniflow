# Omniflow Landing Page

Landing page para o Omniflow com React + TypeScript + Vite + shadcn/ui.

## 🚀 Deploy no Cloudflare Pages

Este projeto está configurado para funcionar perfeitamente no Cloudflare Pages como uma SPA (Single Page Application).

### Configurações importantes:

1. **Build Command**: `npm run build`
2. **Build Output Directory**: `dist`
3. **Node.js Version**: 18 ou superior

### Arquivos de configuração:

- `public/_redirects`: Configura o roteamento SPA para o Cloudflare Pages
- `public/_headers`: Configura cache e headers de segurança
- `wrangler.json`: Configurações específicas do Cloudflare

### Rotas disponíveis:

- `/` - Página principal
- `/termos-de-uso` - Termos de uso

## 🛠️ Desenvolvimento

Para iniciar o ambiente de desenvolvimento, siga estes passos:

1. **Instalação das dependências**:

```bash
npm install
```

2. **Execução do servidor de desenvolvimento**:

```bash
npm run dev
```

3. **Acesso à aplicação**:

Abra seu navegador e acesse `http://localhost:5173`.

### Estrutura de pastas

A estrutura de pastas deste projeto foi organizada da seguinte forma:

```
src/
├── app/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── public/
│   ├── _headers
│   └── _redirects
└── wrangler.json
```

- **app/**: Contém todo o código fonte da aplicação.
- **public/**: Arquivos públicos, como redirects e headers para o Cloudflare.
- **wrangler.json**: Configurações do Cloudflare Workers.

## 🔧 Configurações Adicionais

Para um melhor desenvolvimento e integração contínua, considere as seguintes configurações:

- **EditorConfig**: Um arquivo `.editorconfig` está incluído para padronizar configurações de editor entre diferentes IDEs e editores.
- **Linting e Formatação**: Utilize o ESLint e Prettier para manter a qualidade e padronização do código. Configurações recomendadas estão incluídas.
- **Git Hooks**: Hooks do Git estão configurados para rodar linting e testes automaticamente em commits e pushes.

## 📚 Documentação

Para mais informações sobre as tecnologias e ferramentas utilizadas neste projeto, consulte:

- [React](https://reactjs.org/docs/getting-started.html)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite](https://vitejs.dev/guide/)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Cloudflare Pages](https://developers.cloudflare.com/pages)


## 📝 Licença

Copyright (c) 2025 Omniflow

All rights reserved.

Este código fonte, incluindo mas não se limitando a layout, design, textos e imagens, 
é propriedade exclusiva de Omniflow. 

Não é permitida a cópia, modificação, distribuição ou uso deste software 
sem autorização prévia por escrito de Omniflow.

Para mais informações, entre em contato: omniflow.chat@gmail.com

