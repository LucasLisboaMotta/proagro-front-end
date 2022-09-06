# Proagro Front-End

Este projeto é o front-end deste repositório https://github.com/LucasLisboaMotta/proagro-back-end, e deve ser utilizado com o back-end para ter um bom funcionamento. 

Este é um projeto javascript, feito utilizando as bibliotecas React.js e bootstrap. 

O intuito era criar um front-end de uma aplicação que visa criar os cadastros de pedidos dos produtores rurais de obrigações financeiras relativas a operações de crédito, em caso de ocorrência de perdas nas lavouras.

Para iniciar o projeto, apos o clonar, você precisa utilizar os seguintes comandos:
```
npm install
npm start
```
O projeto deve ser iniciado na porta 3000

Além de permitir o cadastro, leitura, edição e exclusão do pedido. Pelo front-end você também tem a funcionalidade de filtrar por nome,  e-mail, data, CPF, evento e lavoura.

Outra opção é filtrar pela geo-localização, colocando a latitude e longitude do ponto base, e a distância do raio de busca a partir desse ponto.

Este projeto também emite avisos quando é feito duas requisições próximas em um raio de 10 km e feitas no mesmo dia, porem com eventos de perda diferentes.
