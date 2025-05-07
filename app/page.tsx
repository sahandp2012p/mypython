"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <h2>My Python</h2>
      <p>
        Hi Guys!, My name is My python and I post python tutorials. <br />
        You can check out my youtube channel{" "}
        <a href="https://www.youtube.com/@MyPythoncoder" target="_blank">
          here.
        </a>{" "}
        <br />
        In this website I will be posting practice problems for each video in
        the <Link href="/problems">Problems</Link> page.
      </p>
      <br />
      <Button onClick={() => router.push("/sandbox")}>
        Checkout Python Sandbox! <ArrowRight />
      </Button>
    </main>
  );
}
