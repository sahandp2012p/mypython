"use client";

import Editor from "@/components/editor";

export default function Page() {
  return (
    <main>
      <p className="my-1">
        In this page you can type any code you see the output!
      </p>

      <Editor />
    </main>
  );
}
