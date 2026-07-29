# Blips Educa — Design System

Sistema de design completo para a plataforma **Blips Educa**, um LMS focado em manutenção industrial e suporte técnico.

## Paleta Oficial

| Token | Valor | Uso |
|-------|-------|-----|
| `--primary` | `#fcba28` | Amber — cor principal da marca |
| `--primary-foreground` | `#040707` | Texto sobre botões amber |
| `--background` | `#fbfbfb` | Fundo geral da interface |
| `--foreground` | `#040707` | Texto principal |
| `--sidebar` | `#1a1a1a` | Background da sidebar |
| Success | `#009540` | Confirmações e progresso |
| Error | `#DC2626` | Erros e estados críticos |

## Tipografia

- **Sora** — Headings, labels e botões
- **Inter Tight** — Body text e UI

## Seções

### Fundamentos
- Cores, Tipografia, Espaçamento, Radius, Sombras, Grid

### Design Tokens
- Tabela completa de variáveis CSS

### Componentes Genéricos
- Botões (5 variantes × 3 tamanhos)
- Inputs, Checkbox, Radio, Switch
- Badges, Chips, Tags
- Cards, Accordion, Tabs
- Modal, Alerts, Toast
- Feedback: Skeleton, Spinner, Progress Bar
- Breadcrumb, Paginação

### Componentes Blips Educa
- Card de Curso, Card de Máquina
- Trilha de Aprendizado, Card Guia Rápido
- Player de Vídeo, Continue Assistindo
- Recomendações Personalizadas
- Assistente Edu (IA), Chat Flutuante
- Diagnóstico Guiado, Fluxo em Árvore de Decisão
- Timeline de Aprendizado, Dashboard de Progresso

### Estados
- Default, Hover, Focus, Active, Selected, Disabled, Loading, Error, Success

## Como executar

```bash
npm install
npm run dev
```

## Stack

- React 18 + TypeScript
- Tailwind CSS v4
- Vite
- Lucide React (ícones)
