import { Editor } from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { useState } from "react";

export default () => {
  const [code, setCode] = useState();

  return (
    <>
      <Button className="my-[2em]" onClick={() => console.log(code)}>
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
        onChange={(newCode) => setCode(newCode)}
      />
    </>
  );
};
