# 📋 Sistema de Changelog - Omniflow

Este sistema permite gerenciar automaticamente os changelogs da aplicação Omniflow.

## 🚀 Como Funciona

O sistema detecta dinamicamente quais arquivos de changelog existem na pasta `public/changelogs/` através de um arquivo de índice (`index.json`) que é gerado automaticamente.

## 📁 Estrutura de Arquivos

```
public/changelogs/
├── index.json          # Índice automático das versões
├── 3.1.3.9.txt         # Arquivo de changelog da versão 3.1.3.9
├── v2.1.0.txt          # Arquivo de changelog da versão 2.1.0
└── ...
```

## ➕ Adicionando Novas Versões

### 1. Criar o Arquivo de Changelog

Crie um novo arquivo `.txt` na pasta `public/changelogs/` com o nome da versão:

```bash
# Exemplos de nomes válidos:
public/changelogs/3.2.0.txt
public/changelogs/v2.2.0.txt
public/changelogs/1.0.0.txt
```

### 2. Formatar o Conteúdo

Use o formato padronizado com emojis e seções:

```txt
🚀 VERSÃO 3.2.0 - 15 de Janeiro de 2025

✨ NOVAS FUNCIONALIDADES:
- Nova funcionalidade 1
- Nova funcionalidade 2

🛠️ CORREÇÕES E MELHORIAS:
- Correção 1
- Melhoria 1

📈 ESTATÍSTICAS DA VERSÃO:
- 5 novas funcionalidades
- 3 correções
```

**⚠️ IMPORTANTE - Orientações para Changelogs:**

❌ **NÃO incluir:**
- Instruções de backup de VPS
- Orientações internas para desenvolvedores
- Comandos de instalação ou atualização
- Referências a ferramentas internas (ZPRO, ZDG, Z-pro)

✅ **SEMPRE substituir:**
- ZPRO → Omniflow
- ZDG → Omniflow  
- Z-pro → Omniflow

✅ **Foco no usuário final:**
- Funcionalidades novas para o usuário
- Correções que melhoram a experiência
- Breaking changes que afetam o uso

### 3. Atualizar o Índice

Execute o script para atualizar automaticamente o índice:

```bash
npm run update-changelogs
```

## 🛠️ Comandos Disponíveis

### Atualizar Índice de Changelogs
```bash
npm run update-changelogs
```

Este comando:
- Escaneia a pasta `public/changelogs/` para arquivos `.txt`
- Gera automaticamente o arquivo `index.json`
- Ordena as versões da mais recente para a mais antiga
- Atualiza metadados como data da última atualização

## 📝 Formato dos Arquivos

### Estrutura do Changelog
- **Cabeçalho:** Versão e data
- **Seções:** Organizadas por emojis
- **Conteúdo:** Lista de itens claros e concisos
- **Estatísticas:** Resumo quantitativo (opcional)

### Seções Suportadas
- 🚀 **Cabeçalho da Versão**
- ⚠️ **Avisos Importantes**
- 🔴 **Breaking Changes**
- ✨ **Novas Funcionalidades**
- 🛠️ **Correções e Melhorias**
- 📈 **Estatísticas da Versão**

## 🔄 Fluxo de Trabalho

1. **Desenvolver nova versão**
2. **Criar arquivo de changelog** em `public/changelogs/`
3. **Executar** `npm run update-changelogs`
4. **Testar** a exibição na página `/changelog`
5. **Deploy** das alterações

## 🎨 Interface

A página de changelog (`/changelog`) exibe:
- **Lista ordenada** de versões (mais recente primeiro)
- **Cards expansíveis** para cada versão
- **Categorização visual** com ícones e cores
- **Layout responsivo** para todos os dispositivos
- **Footer sempre no final** da página

## 🔧 Manutenção

### Ordem das Versões
As versões são automaticamente ordenadas da mais recente para a mais antiga baseado no número da versão.

### Detecção Automática
O sistema detecta automaticamente novos arquivos quando você executa `npm run update-changelogs`.

### Tratamento de Erros
- Arquivos corrompidos são ignorados
- Versões duplicadas são tratadas adequadamente
- Mensagens de erro são exibidas no console

## 📱 Acesso

- **URL:** `https://seudominio.com/#/changelog`
- **Menu:** Link "Changelog" na navegação principal
- **Público:** Acesso livre para todos os usuários

---

💡 **Dica:** Sempre execute `npm run update-changelogs` após adicionar novos arquivos de changelog para manter o índice atualizado!
