import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@tremor/react";
import { RiPlayFill, RiDeleteBinLine, RiSaveFill } from "react-icons/ri";
import { AiFillFileAdd } from "react-icons/ai";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { TbPointFilled } from "react-icons/tb";

function MonacoComponent() {
  const router = useRouter();
  const [Script, setText] = useState("-- some comment");
  const [Name, setName] = useState<string | undefined>(undefined);
  const [UserName, setUserName] = useState<string | undefined>("??????");
  const [IdUser, setIdUser] = useState<number | undefined>(123456789);
  const [ImageUser, setImageUser] = useState<string | undefined>("https://t7.rbxcdn.com/3640cc46a068dab879c2883b45d12201");
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

  useEffect(() => {
    async function ready() {
      const session = await getSession();
      const user = session?.user;
      setName(user?.name || undefined);
    }
    ready();
  });

  async function Send(text: any) {
    const session = await getSession();
    const user = session?.user;
    setName(user?.name || undefined);
    if (user && user.name) {
      axios
        .post(`/api/v1/Andorid/${user.name}/SendScript`, {
          Script: text,
        })
        .then((res) => {
          console.log("Executed!");
        })
        .catch((error) => {
          if (error.response && (error.response.data.error === "Unauthorized" || error.response.status === 401)) {
            router.replace("/");
          } else {
            console.error("Error:", error);
          }
        });
    } else {
      console.error("User or user name is undefined");
      router.replace("/");
    }
  }

  return (
    <main id="container">
      <div className="m-auto max-w-[1200px]">
        <div className="m-[250px_auto]">
          <div className="bg-[#070707] w-full p-[12px] border-[0.1px] border-yellow-700 rounded-lg mb-[25px]">
            <div className="Options grid grid-cols-10 items-center pb-[20px] justify-between">
              <h2 className="ml-[10px]">{Name}</h2>
              <div className="flex justify-end space-x-2 col-span-9">
                <Button
                  variant="secondary"
                  color="orange"
                  icon={RiSaveFill}
                  onClick={handleSaveFileClick}
                >
                  Save file
                </Button>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
                <Button
                  variant="secondary"
                  color="orange"
                  icon={AiFillFileAdd}
                  onClick={handleCloneFileClick}
                >
                  Clone file
                </Button>
                <Button
                  variant="secondary"
                  color="orange"
                  icon={RiDeleteBinLine}
                  onClick={clean}
                >
                  Clear
                </Button>
                <Button
                  className="flex"
                  variant="secondary"
                  color="orange"
                  icon={RiPlayFill}
                  onClick={() => Send(Script)}
                >
                  Execute
                </Button>
              </div>
            </div>
            <div className="Editor">
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
    </main>
  );
}

export default MonacoComponent;
