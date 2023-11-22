import React, { useEffect, useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ClientAvatar from "../components/client/clientAvatar";
import { EditorComponent } from "../components/editor/editor";
import ConsoleSection from "../components/consoleSection/consoleSection";
import { programFilesData } from "../utilitiy/data";
import { useGlobalContext } from "../context/context";
import { Socket } from "socket.io-client";
import { ACTIONS } from "../utilitiy/common/socketActions";
import { initSocket } from "../utilitiy/common/socket";
import "./pages.css";

interface EditorProps {}

export const EditorPage: React.FC<EditorProps> = ({}) => {
  const [html, setHtml] = useState("<h1>Hello World</h1>");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("console.log('Hello world')");
  const [activeFile, setActiveFile] = useState("index.html");
  const [srcDoc, setSrcDoc] = useState("");
  const [clientList, setClients] = useState([]);
  const { name, setName } = useGlobalContext();
  const socketRef = useRef<Socket | null>(null);
  const { id } = useParams<any>();
  const navigate = useNavigate();
  const roomId = id;
  const fileNameBarClasses = "fileNameList  ";


  useEffect(() => {
    if (!name || name === "") {
      navigate("/");
    }

    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err: any) => handleErrors(err));
      socketRef.current.on("connect_failed", (err: any) => handleErrors(err));

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: name ? name : "",
      });

      socketRef.current.on(ACTIONS.JOINED, joinEventHandler);

      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ html, css, js }) => {
        setHtml(html);
        setCss(css);
        setJs(js);
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ username, socketId }) => {
        toast.success(`${username} has left the room`);
        
        setClients((prev) => prev.filter((c:any) => c.socketId !== socketId));
      });
    };

    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      changeCode();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const joinEventHandler=({ clients, username, socketId }: any)=> {
    setClients(clients);

    if (username !== name) {
      toast.success(`${username} joined the room`);
      socketRef.current?.emit(ACTIONS.SYNC_CODE, {
        socketId,
        html,
        css,
        js,
      });
    }
  }

  const handleErrors =(e?: Error)=> {    
    toast.error("Socket Connection failed, try again later");
    setTimeout(() => {
      // navigate("/");
    }, 4000);
  }
  const copyRoomId=async()=> {
    try {
      await navigator.clipboard.writeText(roomId as string);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  const leaveRoom=()=> {
    navigate("/");
    setName("");
  }

  const changeCode = () => {
    setSrcDoc(`
      <html>
        <style>
        ${css}</style>
        <body>${html}</body>
        <script>
        const originalLog = console.log;
        console.log = (...args) => {
          
          parent.window.postMessage({ type: 'log', args: args }, '*')
          originalLog(...args)
        };
        const originalWarn = console.warn;
        console.warn = (...args) => {
          
          parent.window.postMessage({ type: 'warn', args: args }, '*')
          originalWarn(...args)
        };
        const originalError= console.error;
        console.error = (...args) => {
          
          parent.window.postMessage({ type: 'error', args: args }, '*')
          originalError(...args)
        };
        window.onerror = function(msg, url, line){
          parent.window.postMessage({ type: 'error', args: msg, line: line}, '*')
        }
        ${js}</script>
      </html>
      `);
  };

  const getCodeByFileName = (fileName: string): string => {
    let code = "";
    switch (fileName) {
      case "index.html":
        code = html;
        break;

      case "style.css":
        code = css;
        break;

      case "script.js":
        code = js;
        break;

      default:
        break;
    }
    return code;
  };

  const ChangeCodeByFileName = (fileName: string, value: string) => {
    switch (fileName) {
      case "index.html":
        setHtml(value);
        break;

      case "style.css":
        setCss(value);

        break;

      case "script.js":
        setJs(value);

        break;

      default:
        break;
    }
    socketRef.current?.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      js: fileName === "script.js" ? value : js,
      css: fileName === "style.css" ? value : css,
      html: fileName === "index.html" ? value : html,
    });
  };

  return (
    <div className="bg-bgdark px-2 flex text-white">
      <div className="editor-main ">
        <div className="editor-left-content flex flex-col h-screen justify-between">
          <div className="left-code-info">
            <div className="header-logo">
              <img
                width={50}
                height={50}
                src={
                  "https://drive.google.com/uc?id=1zKNk8rMeQU-_USMqd5M-UDPW-bJiTgzy"
                }
              />
              <h2>Live Code</h2>
            </div>
            <hr />
            <div className="flex-col  my-4 w-full ">
              {Object.keys(programFilesData).map((keyName, i) => {
                let fileData = programFilesData[keyName];

                return (
                  <div
                    key={fileData.language}
                    onClick={() => {
                      setActiveFile(fileData.name);
                    }}
                    className={
                      fileData.name === activeFile
                        ? fileNameBarClasses + "bg-black"
                        : fileNameBarClasses
                    }
                  >
                    <img width="20px" height="20px" src={fileData.iconName} />
                    <p className="mx-4">{" " + fileData.name}</p>
                  </div>
                );
              })}
            </div>
            <h3>Connected</h3>
            <div className="client-avatar-list ">
              {clientList.map((client: any) => (
                <ClientAvatar
                  key={client.socketId}
                  username={client.username}
                />
              ))}
            </div>
          </div>
          <div className="room-info">
            <button onClick={copyRoomId} className="copy-room-id">
              <FaRegCopy /> Room Id
            </button>
            <button onClick={leaveRoom} className="leave-room">
              Leave
            </button>
          </div>
        </div>

        <div style={{ height: "98vh" }} className=" editor-section">
          <div className="editor-component">
            <EditorComponent
              onClickFunc={() => {
                changeCode();
              }}
              onChange={(value: any) => {
                ChangeCodeByFileName(activeFile, value as string);
              }}
              code={getCodeByFileName(activeFile)}
              language={
                programFilesData[activeFile]?.language
              }
            />
          </div>
          <div className="output-console">
            <iframe srcDoc={srcDoc}></iframe>
            <div>
              <ConsoleSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
