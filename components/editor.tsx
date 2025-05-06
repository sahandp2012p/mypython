import { Editor } from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const EditorWithOutput = () => {
  const [code, setCode] = useState<string>("");
  const [stdout, setStdout] = useState<string>("");
  const [stderr, setStderr] = useState<string>("");

  const sendCodeAndGetResponse = async (code: string) => {
    try {
      const response = await axios.post(
        "https://pythonexecuter.onrender.com/execute",
        {
          code: code,
        }
      );

      const { stdout, stderr } = response.data;
      setStdout(stdout || "");
      setStderr(stderr || "");
    } catch (error: any) {
      setStdout("");
      setStderr(
        "Execution failed:\n" + (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <>
      <Button className="my-[2em]" onClick={() => sendCodeAndGetResponse(code)}>
        Run <Play className="ml-2" />
      </Button>

      <Editor
        height="35em"
        language="python"
        theme="vs-dark"
        options={{
          fontSize: 16,
          formatOnType: true,
        }}
        value={code}
        onChange={(newCode) => setCode(newCode || "")}
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
