"use client";

import Image from "next/image";
import {Editor} from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

export default function Home() {
    const submitHandle = {

    }
    return (
        <div>
            <Editor
                initialValue="hello react editor world!"
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                useCommandShortcut={true}
            />
            <button onClick={() => console.log("clicked")}>Click me</button>
        </div>
    );
}
