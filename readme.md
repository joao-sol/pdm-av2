🧪 Testes Unitários e Testes E2E — Guia Rápido
Testes Unitários

Testes unitários servem para testar isoladamente uma parte da aplicação, geralmente inputs, funções ou componentes. 
Eles vão rodar e retornar para o desenvolvedor ou testador ser o resultado foi como esperado.

Testes E2E (End-to-End)

Testes E2E servem para testar funcionalidades de ponta a ponta, simulando o caminho que um usuário faria ao usar o app. 
É muito semelhante às macros que podem ser programadas nos desktops, eles seguem todo o fluxo de clicks, inputs e rotas.

🚀 Como Rodar o Projeto e Configurar os Testes

1️⃣ Iniciar o projeto
yarn start

2️⃣ Instalar dependências do Jest
npx expo install jest-expo jest @types/jest --dev

3️⃣ Ajustar o arquivo package.json

Adicione ou edite estas seções:

{
  "scripts": {
    "test": "jest --watchAll"
  },
  "jest": {
    "preset": "jest-expo"
  }
}

4️⃣ Iniciar novamente o servidor
yarn start


Ou, caso o computador e o celular estejam em redes diferentes:

yarn start --tunnel
