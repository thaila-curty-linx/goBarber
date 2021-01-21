import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing:border-box;

  }

  body{
    background:#312E38;
    -webkit-font-smoothing:antialiased;
    color:white;

  }

  body,input,button{
    font-size:16px;
    font-family: 'Roboto Slab', serif;

  }

  h1,h2,h3,h4,h5,h6,strong{
    font-weight:500;
  }

  button{
    cursor:pointer;
  }
`;
