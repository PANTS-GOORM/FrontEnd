import { createGlobalStyle } from "styled-components";
import hoverCursorIcon from "../assets/img/cursor/hoverCursorIcon.png";
import cursorIcon from "../assets/img/cursor/cursorIcon.png"
import backgroundGif from "../assets/img/background/backgroundImg.gif"

const GlobalStyle = createGlobalStyle`
    :root {
        /* --font-color-yellow: #AAAAAA; */
    }

    /*
    중복으로 작성한 코드가 보인다고 생각하겠지만
    제가 명시한 속성이 원래 속성한테 따잇!당하는 경우가 있어서
    하위 태그에 또 작성했어요. 
    */
    a{
        text-decoration: none;
        color: inherit;
    }

    *{        
        font-family: "YEONGJUSeonbiTTF", sans-serif;
        box-sizing: border-box;
        cursor: url(${cursorIcon}) 2 2, auto;
    }

    button:hover, a:hover {
        cursor: url(${hoverCursorIcon}) 2 2, auto; 
    }
    
    button:active, a:hover{
        cursor: url(${hoverCursorIcon}) 2 2, auto; 
    }

    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        /* margin: 0;
        padding: 0;
        border: 0; */
        vertical-align: baseline;
        font-family: "YEONGJUSeonbiTTF", sans-serif;
        cursor: url(${cursorIcon}) 2 2, auto;
    }

    ol, ul{
        /* list-style: none; */
    }

    button {
        border: 0;
        background: transparent;
    }


    body{
        margin: 0;
        background-image: url(${backgroundGif});
        background-size: cover;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

`;
export default GlobalStyle;