'use client';

import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Badge, Button } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import { jetbrains_mono } from '@/app/fonts/font';
import theme from '@/components/code/customTheme';
import fallbackTheme from '@/components/code/fallbackTheme';
import styles from '@/styles/CodeBlock.module.scss';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<{ [key: string]: React.CSSProperties }>(fallbackTheme);
  const [bgClass, setBgClass] = useState('');
  const [lineNumberBg, setLineNumberBg] = useState('transparent');

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setCurrentTheme(resolvedTheme === 'dark' ? theme.customSolarizedDarkAtom : theme.customSolarizedLightAtom);
    setBgClass(resolvedTheme === 'dark' ? styles.darkBg : styles.lightBg);
    setLineNumberBg(resolvedTheme === 'dark' ? '#242424' : '#f1f1f1');
    document.documentElement.style.setProperty('--scrollbar-color', resolvedTheme === 'dark' ? '#2f2f2f transparent' : '#cacaca transparent');
    return () => {
      setCurrentTheme(fallbackTheme);
      setBgClass('');
      setLineNumberBg('transparent');
      document.documentElement.style.removeProperty('--scrollbar-color');
    };
  }, [resolvedTheme]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={clsx(styles.codeBlock, jetbrains_mono.className, bgClass)} style={{
        scrollbarColor: 'var(--scrollbar-color)',
        scrollbarWidth: 'thin',
        scrollbarGutter: 'auto',
        scrollBehavior: 'smooth',
      }}>
        <div className="quick-action"
             style={{
               position: 'absolute',
               top: 0,
               right: 0,
               display: 'flex',
               alignItems: 'center',
               gap: 8,
               padding: 8,
             }}
        >
          <Badge style={{
            backgroundColor: 'var(--colors-background)',
            color: 'var(--colors-text)',
            fontSize: 12,
          }}>
            {language.toUpperCase()}
          </Badge>
          <CopyToClipboard text={value} onCopy={handleCopy}>
            <Button variant={'soft'}>
              {copied ? '已复制!' : '复制'}
            </Button>
          </CopyToClipboard>
        </div>
        <SyntaxHighlighter
          language={language}
          style={currentTheme}
          customStyle={{
            fontFamily: 'JetBrains Mono, monospace',
            transition: 'color 0.5s, background-color 0.5s',
          }}
          showLineNumbers
          lineNumberStyle={{
            position: 'sticky',
            left: 0,
            background: lineNumberBg,
            paddingRight: '10px',
            marginRight: '10px',
            userSelect: 'none',
            minWidth: '2em',
            transition: 'background-color 0.5s',
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
};

export default CodeBlock;
