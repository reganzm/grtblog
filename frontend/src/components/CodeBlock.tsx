'use client';

import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight, solarizedDarkAtom } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Badge, Button } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import { jetbrains_mono } from '@/app/fonts/font';

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2 秒后重置复制状态
  };

  return (
    <div style={{ position: 'relative' }} className={jetbrains_mono.className}>
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
        <Badge>
          {language}
        </Badge>
        <CopyToClipboard text={value} onCopy={handleCopy}>
          <Button
            variant={'soft'}>
            {copied ? '已复制!' : '复制'}
          </Button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter language={language}
                         style={theme.resolvedTheme === 'dark' ? solarizedDarkAtom : solarizedlight}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
