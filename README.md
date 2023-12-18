# Easy Park

## Easy Park é um projeto de TCC, que consiste em um aplicativo para gerenciamento de estacionamentos com uma feature única de visualização de vagas em tempo real. A API consiste na integração com o GoogleMaps para toda a geolocalização e integração com a AsaasAPI para a getway de pagamento.

## Principais telas do aplicativo e suas funcionalidades:

### Login  
#### A tela de login é a primeira interface à qual os usuários terão acesso ao iniciar o protótipo. Nela, os usuários podem escolher entre as seguintes opções: criar uma nova conta, fazendo o redirecionamento para a tela de cadastro; efetuar login utilizando uma conta já cadastrada, preenchendo os campos de e-mail e senha e clicando no botão de login; ou optar por efetuar login por meio de terceiros, como as contas do Google, Facebook ou Twitter. Além disso, a tela oferece a opção de redefinir a senha, caso seja necessário.

![image-removebg-preview](https://github.com/EduardoLangner/easyParkAppFrontend/assets/69880659/f9ce863f-f097-4604-b629-ab1037e23fec)

### Cadastro
#### Se o usuário optar por criar uma conta, ele será redirecionado para a tela de cadastro. Nessa tela, o usuário tem a opção de retornar à tela de login ou preencher os campos necessários para registrar sua conta. Os dados essenciais para a criação de uma conta incluem o nome completo, CPF, endereço de e-mail e a definição de uma senha, juntamente com um campo adicional para a confirmação de senha, garantindo a precisão dos dados fornecidos.

![image-removebg-preview (1)](https://github.com/EduardoLangner/easyParkAppFrontend/assets/69880659/cc401d44-79b0-47df-bc0b-06999ac3fff4)

### HomePage
#### Após efetuar o login, o usuário é direcionado para a tela principal do aplicativo, conforme ilustrado na Figura 21, que exibe informações cruciais para o funcionamento do mesmo. A Homepage, assim como todas as telas, conta com um menu de navegação na parte inferior da tela, que serve para navegar para todas as telas existentes. Nessa tela, o usuário pode visualizar o tempo disponível para estacionar seu veículo, bem como ativar e desativar uma vaga de estacionamento. Além disso, ele pode incluir e gerenciar informações sobre seus veículos. Para ativar uma vaga, o usuário deve primeiro cadastrar um veículo, e para fazer isso, deve clicar no botão "Cadastrar" localizado na parte superior da tela. Ao clicar neste botão, um modal é aberto, solicitando o registro da placa do veículo.

![image-removebg-preview (2)](https://github.com/EduardoLangner/easyParkAppFrontend/assets/69880659/3ec1ff48-0e61-45a1-86dd-75d2b5d864e5)

### Pagamento / Recarga
#### Após o usuário ter cadastrado um veículo no protótipo e tentar ativar uma vaga, a ativação ocorre se houver saldo disponível. No entanto, se o saldo for insuficiente, o usuário será direcionado para a tela de pagamento. Nesta tela, o usuário tem a opção de inserir ou selecionar um cartão de pagamento, e o valor da transação pode ser escolhido por meio de um carrossel de valores localizado na parte superior da tela.

![image-removebg-preview (3)](https://github.com/EduardoLangner/easyParkAppFrontend/assets/69880659/6b3b890d-c369-40f1-898f-014bfe9e668c)

### Mapa
#### O mapa de vagas é uma tela que permite ao usuário visualizar no mapa as vagas de estacionamento disponíveis. Nessa tela, todas as vagas da zona azul da cidade são exibidas, com os pontos verdes indicando disponibilidade e os pontos vermelhos indicando ocupação.

![image-removebg-preview (5)](https://github.com/EduardoLangner/easyParkAppFrontend/assets/69880659/2e653851-4f14-4f44-a169-03b78e2257b3)

### Menu
#### Nesta tela, estão disponíveis os dados do usuário, como nome, CPF e email, que podem ser visualizados pelo usuário. Além disso, há a seção "Meus Veículos," onde as informações sobre os veículos registrados ficam disponíveis para visualização. A tela também inclui uma seção de contato, juntamente com uma aba de perguntas frequentes, proporcionando um recurso útil de suporte.

![image-removebg-preview (4)](https://github.com/EduardoLangner/easyParkAppFrontend/assets/69880659/d9c0ae9f-a978-4d4a-9a57-3d88e4c6bc59)
