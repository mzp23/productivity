import Head from "next/head";
import Timer from "../components/timer/timer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Productivity</title>
      </Head>
      <div className="bg-red-500 h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold underline flex justify-center">
          Productivity
        </h1>
        <Timer />
      </div>
    </>
  );
}
