import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* @import url('https://fonts.googleapis.com/css2?family=Spartan&wght@600&display=swap'); */

@import url("https://fonts.googleapis.com/css?family=Notable");
body {
  font-family: "Spartan", sans-serif;
}


  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    /* font-family: 'sans-serif'; */
  }

  html, body {
    /* font-family: 'Notable',"Comic Sans MS", sans-serif; */
    max-width: 100vw;
}


  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;


  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  body {
    line-height: 1.25;
    color: #FFFFFF;

  }
  input{
    font-family: 'Spartan', sans-serif;
  }

  a{text-decoration: none;}

  #root{
      height:100%;
  }

`;

export const colors = {
  primary: "#06d6a0", //CARIBBEAN GREEN
  secondary: "#FFD166", //ORANGE YELLOW CRAYOLA
  buttons: "#118AB2", //BLUE NCS
  lighttext: "#FFFFFF", //WHITE
  darktext: "#073B4C", //MIDNIGHT GREEN EAGLE GREEN
  accent: "#EF476F", //PARADISE PINK
  shadow: "#d4d4d4", //SOME GREY
};

export const numbers = {
  headerFooterHeight: "80px",
};

export default GlobalStyles;
