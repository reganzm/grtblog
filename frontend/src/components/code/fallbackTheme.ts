import { CSSProperties } from 'react';

const fallbackTheme: { [key: string]: CSSProperties } = {
  'code[class*="language-"]': {
    fontFamily: 'inherit',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    fontFamily: 'inherit',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
    borderRadius: '0.3em',
    background: 'none',
  },
  ':not(pre) > code[class*="language-"]': {
    background: 'none',
    padding: '.1em',
    borderRadius: '.3em',
  },
};

export default fallbackTheme;
