import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@tremor/react";
import { RiPlayFill, RiDeleteBinLine, RiSaveFill } from "react-icons/ri";
import { AiFillFileAdd } from "react-icons/ai";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

function MonacoComponent() {
  const router = useRouter();
  const [Script, setText] = useState("-- some comment");
  const editorRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  function handleEditorChange(value: any) {
    setText(value);
  }

  function clean() {
    if (Script) {
      setText("");
    }
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    if (!target) return;
    const files = target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
    };
    reader.readAsText(file);
  }

  function handleCloneFileClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleSaveFileClick() {
    const blob = new Blob([Script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "script.lua";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  async function Send(text: any) {
    const session = await getSession();
    const user = session?.user;
    axios
      .post(`/api/v1/Andorid/${user}/SendScript`, { Script: text })
      .then((res) => {
        console.log("Executed!");
      })
      .catch((error) => {
        if (error.response && error.response.data.error === "Unauthorized") {
          router.push("/");
        } else {
          console.error("Error:", error.data);
        }
      });
  }

  return (
    <div>
      <div className="relative flex p-[16px_0px_16px_16px]">
        <div className="h-[calc(100%+90px)] flex flex-col w-[100%] items-center m-[210px_auto] p-[0px_16px_16px] overflow-visible">
          <div className="relative grid grid-cols-[1fr_auto] w-[50%] gap-[16px] p-[0px_0px]">
            <div className="flex flex-col gap-[16px] rounded-[8px]">
              <div className="Background flex flex-row gap-[16px] p-[16px_16px_16px] rounded-[8px] shadow-none bg-[#0e0e0e]">
                <h2 className="flex flex-row place-content-start font-bold text-[24px] pt-[1px]">
                  The Moon
                </h2>
                <div className="flex flex-row ml-auto gap-[15px]">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                  <Button
                    variant="secondary"
                    color="zinc"
                    icon={RiSaveFill}
                    onClick={handleSaveFileClick}
                  >
                    Save file
                  </Button>
                  <Button
                    variant="secondary"
                    color="zinc"
                    icon={AiFillFileAdd}
                    onClick={handleCloneFileClick}
                  >
                    Clone file
                  </Button>
                  <Button
                    variant="secondary"
                    color="zinc"
                    icon={RiDeleteBinLine}
                    onClick={clean}
                  >
                    Clear
                  </Button>
                  <Button
                    className="flex"
                    variant="secondary"
                    color="zinc"
                    icon={RiPlayFill}
                    onClick={() => Send(Script)}
                  >
                    Execute
                  </Button>
                </div>
              </div>
              <div className="Background flex flex-col p-[24px_16px_16px] rounded-[8px] shadow-none bg-[#0e0e0e]">
                <Editor
                  height="500px"
                  width="100%"
                  defaultLanguage="lua"
                  defaultValue="-- some comment"
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  value={Script}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonacoComponent;
