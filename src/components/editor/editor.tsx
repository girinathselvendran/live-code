import Editor, { Monaco, OnChange } from "@monaco-editor/react";
import React, { useRef } from "react";
import PrimaryButton from "../button";
import "./editor.css";
interface EditorComponentProps {
  language?: string;
  code?: string;
  onChange: OnChange;
  onClickFunc: any;
}

// export const EditorComponent = () => {
export const EditorComponent: React.FC<EditorComponentProps> = ({
  language,
  code,
  onChange,
  onClickFunc,
}) => {
  const editorRef: any = useRef(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }
  function showValue() {
    alert(editorRef.current.getValue());
    eval(editorRef.current.getValue());
  }

  return (
    <div>
      <div className=" editor-component h-10 bg-bgdark p-8 flex items-center justify-center">
        {/* <PrimaryButton text="Run" onClickFunc={onClickFunc} /> */}
        <button onClick={onClickFunc} className="primary-button" type="submit">
          Run
        </button>

        <Editor
          className="text-xl"
          height="91vh"
          onChange={onChange}
          // defaultLanguage={language}
          language={language}
          value={code}
          theme="Visual Studio Dark"
          options={{ fontSize: 20 }}
        />
      </div>

      {/* <button onClick={showValue}>Show value</button>
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      /> */}
    </div>
  );
};
