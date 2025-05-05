import { Editor } from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

export default () => {
  return (
    <>
      <Button className="my-[2em]">
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
      />
    </>
  );
};
