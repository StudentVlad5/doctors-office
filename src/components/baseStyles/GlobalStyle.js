import 'modern-normalize';
import { createGlobalStyle } from 'styled-components';
import { theme } from './Variables.styled';

export const GlobalStyle = createGlobalStyle`
  body { 
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  background-color: ${theme.colors.grey};
  }

  code {
  font-family: source-code-pro, 'Menlo', 'Monaco', 'Consolas', 'Courier New',
    monospace;
  }

  #canvas_mouse{
    position: fixed;
    top:0;
    left:0;
    height: 100vh;
    width: 100vw;
  }

// -----reset----- //
h1, h2, h3, h4, h5, h6, p {
  padding: 0;
  margin: 0;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

img {
  display:block;
  max-width: 100%;
  height: auto;
}

// ----pagination----//
.table-filter-info {
  display:inline-block;
  width:100%;
  margin: auto auto 45px auto;
  overflow: auto;
}

.rc-pagination-total-text{
  display:none;
}

.pagination-data {
  padding: 0;
  margin: 0;
}

.pagination-data li {
  list-style: none;
}

.rc-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.rc-pagination-item,
.rc-pagination-prev,
.rc-pagination-jump-prev,
.rc-pagination-jump-next {
  margin-right: 8px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    margin-right: 20px;
  }
 }

.rc-pagination-jump-next,
.rc-pagination-jump-prev,
.rc-pagination-next,
.rc-pagination-prev {
  display: inline-block;
  min-width: 28px;
  height: 28px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.85);
  text-align: center;
  vertical-align: middle;
  list-style: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all .3s;
}

.rc-pagination-jump-next button,
.rc-pagination-jump-prev button {
  color:${theme.colors.black};
  background: transparent;
  border: none;
  cursor: pointer;
}

.rc-pagination-jump-next button:after,
.rc-pagination-jump-prev button:after {
  display: block;
  content: "•••";
}

.rc-pagination-item,
.rc-pagination-prev,
.rc-pagination-next {
  min-width: initial;
  height: auto;  
  font-size: 10px;
  line-height: initial;
  color:${theme.colors.black}!important;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.rc-pagination-item a,
.rc-pagination-item button,
.rc-pagination-prev a,
.rc-pagination-prev button,
.rc-pagination-next a,
.rc-pagination-next button,
.rc-pagination-total-text a,
.rc-pagination-total-text button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  font-size: 14px;
  font-weight: 400;
  color: #4E4E4E !important;
  
  background-color: ${theme.colors.white};
  border-radius: 10px;
  border: 1px solid #999;
  
  transition: 0.3s;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 18px;
    width: 36px;
    height: 36px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 24px;
    width: 46px;
    height: 46px;
  }
}

.rc-pagination-item.rc-pagination-item-active a,
.rc-pagination-item.rc-pagination-item-active a:hover,
.rc-pagination-prev.rc-pagination-item-active a,
.rc-pagination-prev.rc-pagination-item-active a:hover,
.rc-pagination-next.rc-pagination-item-active a,
.rc-pagination-next.rc-pagination-item-active a:hover,
.rc-pagination-total-text.rc-pagination-item-active a,
.rc-pagination-total-text.rc-pagination-item-active a:hover {
  background-color: #98CEFF;
  border-radius: 10px;
  border: 1px solid #999;
}

.rc-pagination-item a:hover,
.rc-pagination-item button:hover,
.rc-pagination-prev a:hover,
.rc-pagination-prev button:hover,
.rc-pagination-next a:hover,
.rc-pagination-next button:hover,
.rc-pagination-total-text a:hover,
.rc-pagination-total-text button:hover {
  background-color: #98CEFF;
}
`;
