import { getToken } from '@/utils/token';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button, message } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

type EditorHandle = {
  getInstance: () => Editor | null;
  getRootElement: () => HTMLElement | null;
  context: any;
  setState: any;
  forceUpdate: any;
};

const CustomEditor = forwardRef<EditorHandle, NonNullable<unknown>>(
  (props, ref) => {
    const editorRef = useRef<Editor>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useImperativeHandle(ref, () => ({
      getInstance: () => editorRef.current?.getInstance(),
      getRootElement: () => editorRef.current?.getRootElement() || null,
      setMarkdown: (markdown: string) => {
        editorRef.current?.getInstance().setMarkdown(markdown);
      },
      getMarkdown: () => editorRef.current?.getInstance().getMarkdown() || '',
      context: editorRef.current?.context,
      setState: editorRef.current?.setState,
      forceUpdate: editorRef.current?.forceUpdate,
    }));

    const handleImageUpload = async (
      blob: Blob,
      callback: (url: string, altText: string) => void,
    ) => {
      const formData = new FormData();
      formData.append('file', blob);

      const response = await fetch('/api/v1/upload', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + getToken(),
        },
        body: formData,
      });

      const res = await response.json();
      if (res.code === 0) {
        message.success('图片已上传并插入');
      } else {
        message.error('图片上传中遇到问题');
      }
      const imageUrl = `${window.location.href.replace(location.pathname, '')}${
        res.data
      }`;

      callback(imageUrl, 'image');
    };

    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.indexOf('image') !== -1) {
            const blob = item.getAsFile();
            if (blob) {
              handleImageUpload(blob, (url) => {
                const editorInstance = editorRef.current?.getInstance();
                editorInstance?.insertText(`![image](${url})`);
              });
            }
          }
        }
      }
    };

    function enterFullscreen(element: HTMLElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    }

    function exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    const toggleFullscreen = () => {
      setIsFullscreen(!isFullscreen);
      if (!isFullscreen) {
        enterFullscreen(document.documentElement);
      } else {
        exitFullscreen();
      }
    };

    return (
      <div
        style={
          isFullscreen
            ? {
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.5s',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'white',
                zIndex: 9999,
                padding: '20px',
              }
            : {
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.5s',
              }
        }
      >
        <div
          style={{
            marginBottom: '10px',
            padding: '8px',
          }}
        >
          <span>
            想要写点什么呢 ٩(๑˃̵ᴗ˂̵๑)۶ {!isFullscreen && '| 更好的编辑体验？试试'}
          </span>
          <Button
            type="link"
            size={'small'}
            icon={
              isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
            }
            onClick={toggleFullscreen}
          >
            {isFullscreen ? '退出全屏' : '全屏'}
          </Button>
        </div>
        <Editor
          initialValue=""
          ref={editorRef}
          initialEditType="markdown"
          previewStyle="vertical"
          height={isFullscreen ? '100vh' : '600px'}
          useCommandShortcut={true}
          hooks={{
            addImageBlobHook: handleImageUpload,
          }}
          // events={{
          //   paste: handlePaste,
          // }}
        />
      </div>
    );
  },
);

export default CustomEditor;
