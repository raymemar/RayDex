# Pokédex - Sistema de Cadastro de Pokémons

Este é um projeto React que se comunica com o Firebase Firestore para armazenar e recuperar dados de Pokémons.

## Funcionalidades

- **Listar Pokémons**: Exibe todos os Pokémons cadastrados no Firebase com imagem, número e nome
- **Cadastrar Pokémon**: Permite inserir um novo Pokémon no Firebase com mais de 10 atributos
- **Detalhar Pokémon**: Mostra todas as informações de um Pokémon específico

## Estrutura do Projeto

- `ListarPokemons.jsx`: Lista todos os Pokémons cadastrados
- `CadastrarPokemons.jsx`: Formulário para cadastrar novos Pokémons
- `DetalhesPokemon.jsx`: Página de detalhes de um Pokémon específico
- `firebaseConfig.js`: Configuração do Firebase

## Atributos do Pokémon

1. **Número**: Identificador único do Pokémon
2. **Nome**: Nome do Pokémon
3. **Imagem**: URL da imagem do Pokémon
4. **Tipo 1**: Tipo primário (obrigatório)
5. **Tipo 2**: Tipo secundário (opcional)
6. **Habilidades**: Lista de habilidades
7. **Altura**: Altura em metros
8. **Peso**: Peso em quilogramas
9. **Descrição**: Descrição do Pokémon
10. **Categoria**: Categoria do Pokémon
11. **Fraquezas**: Lista de fraquezas
12. **Evolução Próxima**: Informações sobre evoluções
13. **Habitat**: Habitat onde o Pokémon vive

## Como usar

1. **Iniciar o projeto**: `npm run dev`
2. **Cadastrar um Pokémon**: 
   - Clique em "Cadastrar Pokémon"
   - Preencha os campos obrigatórios (Número, Nome, Imagem, Tipo 1)
   - Use o botão "Preencher Exemplo" para testar rapidamente
3. **Ver lista de Pokémons**: Acesse a página inicial
4. **Ver detalhes**: Clique em qualquer Pokémon da lista

## Tecnologias

- React + Vite
- Firebase Firestore
- React Router DOM

## Exemplo de dados

```javascript
{
  numero: 1,
  nome: "Bulbasaur",
  imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  tipo1: "Grama",
  tipo2: "Veneno",
  habilidades: ["Overgrow", "Chlorophyll"],
  altura: 0.7,
  peso: 6.9,
  descricao: "Bulbasaur pode ser visto dormindo sob a luz do sol...",
  categoria: "Pokémon Semente",
  fraquezas: ["Fogo", "Voador", "Psíquico", "Gelo"],
  evolucaoProxima: [
    { numero: 2, nome: "Ivysaur" },
    { numero: 3, nome: "Venusaur" }
  ],
  habitat: "Floresta"
}
```

## Solução de Problemas

- Se o botão "Cadastrar" não funcionar, verifique o console do navegador
- Certifique-se de que os campos obrigatórios estão preenchidos
- Verifique se a URL da imagem é válida
- O Firebase deve estar configurado corretamente em `firebaseConfig.js`+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
