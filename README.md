# Our Traveler
## _Sistema de passagens online_


> Sistema criado como trabalho prático para a matéria 
> banco de dados I em Universidade Federal de Ouro Preto 
> Permite que empresas de ônibus se cadastrem e 
> passageiros comprem passagens para poder viajar 

- Autor: @VictorTorquato

## Instalação

Para poder utilizar a API, é necessário ter instalado o Node.js, Git e PostgreSQL na máquina, segue os links para download:

 - Node.js - https://nodejs.org/en/ 
 - Git - https://git-scm.com/downloads
 - Postgresql - https://www.postgresql.org/download/

Após ter instalado, crie uma pasta onde vai ser armazenado o projeto e rode o terminal nessa pasta ( Windows: Shift+ClickDireito - “Abrir janela do PowerShell aqui”). No terminal, digite os seguintes comandos um de cada vez e dê “Enter”:

```
git clone https://github.com/VictorTorquato/Sistema-de-Passagens-Online

cd Sistema-de-Passagens-Online

psql postgres postgres
```
> Caso solicite uma senha, insira postgres, vamos configurar o banco de dados:
```
CREATE DATABASE ourtraveler;

\c ourtraveler;

\i  'C:\\\Caminho do arquivo\\\CriaBanco.sql';

\i 'C:\\\Caminho do arquivo\\\PovoaBanco.sql';

\q;
```
> Com isso configuramos o banco. Vamos agora instalar as dependências
e rodar o projeto:
```
cd API

npm install
```
> Após a instalação, rode a API usando:
```
node src/index.js
```
> Agora abra novamente o terminal na pasta Sistema-de-Passagens-Online e execute o frontend:
```
cd frontend

npm install

npm start
```
Com isso, o projeto foi clonado para sua máquina, todas as dependências foram instaladas e o sistema estará rodando na seguinte URL:

 - http://localhost:3000/home

