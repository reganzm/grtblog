import {useLocation} from '@@/exports';
import React, { useEffect, useState } from 'react';
import styles from './Footer.module.less';

const Footer: React.FC = () => {
  const [isSSR, setIsSSR] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement && rootElement.children.length > 0) {
      setIsSSR(true);
    }
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {location.pathname === '/home' && (
          <div className={styles.row}>
            <div className={styles.column}>
              <h4> 关于此项目 </h4>
              <p>Grtblog 是一个专注于技术分享的博客平台。</p>
              <p>
                {' '}
                它采用前后端分离的技术开发，前端使用 Next.js，后端使用 Spring
                Boot。
              </p>
              <p> 希望这一小小的项目能伴你写作的时光。</p>
              <p> 当前使用的是管理端 </p>
            </div>
            <div className={styles.column}>
              <h4> 管理端技术栈 </h4>
              <ul>
                <li>React</li>
                <li>Umijs / Umijs Max</li>
                <li>Ant Design / Ant Design Pro</li>
                <li>TypeScript</li>
              </ul>
            </div>
            <div className={styles.column}>
              <h4> 链接 </h4>
              <ul>
                <li>
                  <a
                    href="https://github.com/grtsinry43/grtblog"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://grtblog.js.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    官网
                  </a>
                </li>
                <li>
                  <a
                    href="https://blog.grtsinry43.com/about-grtblog"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    作者博客介绍
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className={styles.copyright}>
          <p>
            © 2024-2025 | Powered by Grtblog / Under MIT License | 版本: 0.2.0 | SSR:{' '}
            {isSSR ? '是' : '否'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
