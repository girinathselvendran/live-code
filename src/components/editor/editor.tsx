import Editor, { OnChange } from "@monaco-editor/react";
import React from "react";
import "./editor.css";

interface EditorComponentProps {
  language?: string;
  code?: string;
  onChange: OnChange;
  onClickFunc: any;
}

export const EditorComponent: React.FC<EditorComponentProps> = ({
  language,
  code,
  onChange,
  onClickFunc,
}) => {
  return (
    <div>
      <div className=" editor-component">
        <button onClick={onClickFunc} className="run-button" type="submit">
          Run
        </button>
        <Editor
          className="text-xl"
          height="91vh"
          onChange={onChange}
          language={language}
          value={code}
          theme="Visual Studio Dark"
          options={{ fontSize: 20 }}
        />
      </div>
    </div>
  );
};
