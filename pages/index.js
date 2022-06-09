import Head from "next/head";
import { useState } from "react";
import Timer from "../components/timer/timer";

export default function Home() {
  const [title, setTitle] = useState(null);

  return (
    <>
      <Head>
        <title>{`${
          title ? title.time + " | " + title.focusStatus : "Productivity"
        }`}</title>
      </Head>
      <section className="bg-red-500 h-screen flex flex-col items-center justify-center">
        <Timer changeTitle={setTitle} />
      </section>
    </>
  );
}
