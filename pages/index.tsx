import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Tailwind Animation Helper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-3 w-full">
        {/* Output box + Settings area */}
        <div className="col-span-2 bg-red-500 min-h-screen h-fit"></div>

        {/* Effects Adder */}
        <div className="col-span-1 bg-blue-500 min-h-screen h-fit"></div>
      </div>
    </div>
  );
};

export default Home;
