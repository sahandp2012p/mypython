import { Editor } from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const sendCodeAndGetResponse = (code: string) => {
  console.log(code);
  axios
    .post("https://pythonexecuter.onrender.com/execute", {
      code: code,
    })
    .then((response) => {
      console.log(response.data);
    });
};

export default () => {
  const [code, setCode] = useState<string>();

  return (
    <>
      <Button className="my-[2em]" onClick={() => sendCodeAndGetResponse(code)}>
        Run <Play />
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
        onChange={(newCode: any) => setCode(newCode)}
      />
    </>
  );
};
