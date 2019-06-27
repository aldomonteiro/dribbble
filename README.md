### Requisitos

- [ ] A aplicação deve listar os shots populares do serviço (Não foi possível).
- [ ] Ao clicar em um shot deverá ser exibida uma págna de detalhes com título, mídia (imagem ou vídeo ), descrição, tags e data de publicação.
- [X] A página de detalhes de cada shot deverá ser acessível diretamente através de uma URL.

### Resgistrando uma aplicação no Dribbble

Para executar esse aplicativo é necessário registrar um aplicativo Dribbble utilizando API v2, gerar seu token de acesso do cliente.

#### Registrando seu aplicativo Dribbble

- Entre na página da sua conta dribbble.com
- Selecione Applications no menu lateral
- Na seção Developers, selecione Register a New Application.
- Preencha o formulário, use o URL do seu website no campo Callback URL (você precisará disso mais tarde)
- Leia os Termos e Registre-se
- Você será redirecionado para uma tela que mostra os detalhes do aplicativo registrados com êxito. Anote os números do Client ID e do Client Secret na parte inferior da página.

#### Autorizando
- Abra uma janela do navegador e faça login na sua conta do Dribbble
- Em uma nova janela, acesse a seguinte URL: https://dribbble.com/oauth/authorize?client_id=CLIENT_ID (substitua CLIENT_ID pelo número fornecido ao registrar seu aplicativo)
- Uma tela de autorização aparecerá com o nome do aplicativo registrado, escolha Autorizar seu aplicativo

Depois de autorizar, você será redirecionado para uma URL semelhante a esta:

http://callback_url?code=9892aebffbb8c82d93e3f2c63a1dab160cefcb1ae269df3a4315924b87246a67

- Usando o [Postman](https://www.getpostman.com/apps), crie uma nova Request
- Selecione POST e insira o seguinte URL: https://dribbble.com/oauth/token?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&code=COPIED_CODE
- Substitua o CLIENT_ID e o CLIENT_SECRET pelo ID e pelo segredo fornecidos pelo Dribbble após registrar seu aplicativo com sucesso
- Substitua o COPIED_CODE pelo código que você acabou de copiar da página do URL de retorno de chamada
- Clique em Send, e seu token de acesso será retornado. Segue um exemplo:

```json
{
    "access_token": "9f061d26c5a8be96b17a81718959a67dd54ca9669ca41752777193f7cc5be7c3",
    "token_type": "bearer",
    "scope": "public",
    "created_at": 1520591461
}
```

Agora que você possui o token de acesso, crie um arquivo na raiz do projeto chamado `.env` e insira o token de acesso precedido da change `REACT_APP_API_KEY`, desta forma:

```js
REACT_APP_API_TOKEN=ACCESS_TOKEN
```

Substitua ACCESS_TOKEN pelo token recebido anteriormente.


[TODO]

### Executar o App localmente

[TODO]

### Estilos

Os estilos do projeto utilizam [Styled-Components](https://www.styled-components.com/).

#### Motivação

`Styled-Components` possibilita:

- Crítica automática do CSS: controla quais componentes são renderizados em uma página e insere seus estilos e nada mais, de forma totalmente automática. Combinado com a divisão de código, isso significa  carregar a menor quantidade de código necessária.
- Fim dos bugs de nome de classe: nomes de classe exclusivos são gerados para os estilos. Sem preocupação com duplicação, sobreposição ou erros ortográficos.
- Exclusão mais fácil de CSS: pode ser difícil saber se um nome de classe é usado em algum lugar em sua base de código. `Styled-components` torna isso óbvio, já que todo estilo está ligado a um componente específico. Se o componente não for utilizado (o que o editor de código ferramenta pode detectar) e for excluído, todos os seus estilos serão excluídos com ele.
- Estilo dinâmico simples: adaptar o estilo de um componente com base em `props` ou um tema global é simples e intuitivo, sem ter que gerenciar manualmente dezenas de classes.
- Manutenção indolor: não é necessário caçar arquivos diferentes para encontrar o estilo que afeta seu componente, portanto, a manutenção é fácil, independentemente do tamanho da base de código.
- Prefixo automático do fornecedor: o CSS é escrito no padrão atual e a ferramenta manipulem o restante.

Todos esses benefícios são alcançados escrevendo CSS padrão, apenas vinculado a componentes individuais.

### Estrutura dos components com lógica

Os componentes que possuem lógica de negócio foram escritos utilizando uma função `wrapper`. A ideia é criar essa função com o layout do componente e um parametro `node`. O parâmetro `node` será substituído pelos componentes que satisfizerem as condições de renderização do componente.

Considere o component `Shots`desse projeto, escrito dessa forma (com a função `wrapper`):

```jsx
const Shots = ({ fetchShots, shots = [], loading, error }) => {

  // Containers desse component, poderão receber um component de Erro,
  // Loading ou os dados que forem retornados do store.
  const wrapper = node => (
    <CardContainer>
      {node}
    </CardContainer>);

  if (error)
    return wrapper(<Error />);

  if (shots.length === 0)
    fetchShots();

  if (shots.length === 0 || loading)
    return wrapper(<LoadingContainer><Loading /></LoadingContainer>);

  return wrapper(
    shots.map(shot => <div key={shot.id}>
      <Link to={{ pathname: shot.id, state: { modal: true } }}>
        <Card shot={shot} />
      </Link>
    </div>));
}
```

Agora, considere o mesmo componente escrito sem o auxílio da função `wrapper`:

```jsx
const Shots = ({ fetchShots, shots = [], loading, error }) => {
  if (shots.length === 0 && !error)
    fetchShots();

  console.log(error);

  return loading ? <LoadingContainer><Loading /></LoadingContainer>
    : error ? <Error />
      : <CardContainer>
        {shots.map(shot => <div key={shot.id}>
          <Link to={{ pathname: shot.id, state: { modal: true } }}>
            <Card shot={shot} />
          </Link>
        </div>)}
      </CardContainer>
}
```

Note que a segunda opção é mais concisa (menos linhas de código), no entanto, é menos legível e mais sucetível a erros. Por esse motivo, escolhi a primeira abordagem, com mais linhas de código, em prol da legibilidade e manutenibilidade do código.





This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Runs unit tests using Jest.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


### Organização dos arquivos de teste

Jest pesquisará por arquivos de teste com as seguintes convenções:

- Arquivos com sufixo .js dentro de pastas chamadas __tests__.
- Arquivos com sufixo .test.js
- Arquivos com sufixo .specs.js

Os desenvolvedores do Create-React-App [recomendam que os arquivos de teste estejam próximos ao código que eles testam](https://facebook.github.io/create-react-app/docs/running-tests#filename-conventions) para que os imports relativos fiquem mais curtos. Por isso, decidi utilizar a estrutura de subpastas chamadas __tests__ dentro da pasta na qual está o código testado, pois assim não haverá um grande número de arquivos na mesma pasta, caso optasse por manter arquivos .test.js na mesma pasta dos código do programa.

