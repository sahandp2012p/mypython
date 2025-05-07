import { Editor } from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { useState, useRef } from "react";
import axios from "axios";

const EditorWithOutput = () => {
  const [code, setCode] = useState<string>("");
  const codeRef = useRef<string>(""); // ✅ new ref to track latest code
  const [stdout, setStdout] = useState<string>("");
  const [stderr, setStderr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendCodeAndGetResponse = async (codeToSend: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://pythonexecuter.onrender.com/execute",
        { code: codeToSend }
      );
      const { stdout, stderr } = response.data;
      setStdout(stdout || "");
      setStderr(stderr || "");
    } catch (error: any) {
      setStdout("");
      setStderr(
        "Execution failed:\n" + (error.response?.data?.error || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditorMount = (editor: any, monaco: any) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      sendCodeAndGetResponse(codeRef.current); // ✅ use latest code from ref
    });
  };

  return (
    <>
      <div className="flex items-center gap-4 my-[2em]">
        <Button onClick={() => sendCodeAndGetResponse(code)} disabled={loading}>
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Running...
            </>
          ) : (
            <>
              Run <Play className="ml-2" />
            </>
          )}
        </Button>
      </div>

      <Editor
        height="25em"
        language="python"
        theme="vs-dark"
        options={{
          fontSize: 16,
          formatOnType: true,
        }}
        value={code}
        onChange={(newCode) => {
          setCode(newCode || "");
          codeRef.current = newCode || ""; // ✅ update ref when code changes
        }}
        onMount={handleEditorMount}
      />

      <div className="bg-black text-white p-4 mt-4 rounded-md font-mono text-sm">
        <h2 className="text-lg font-bold text-green-400">Output (stdout)</h2>
        <pre className="whitespace-pre-wrap break-words mb-4">
          {stdout || "[no output]"}
        </pre>

        {stderr && (
          <>
            <h2 className="text-lg font-bold text-red-400">Errors (stderr)</h2>
            <pre className="whitespace-pre-wrap break-words text-red-300">
              {stderr}
            </pre>
          </>
        )}
      </div>
    </>
  );
};

export default EditorWithOutput;
