import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "components/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jazz In Toronto</title>
        <meta name="description" content="Jazz In Toronto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">Jazz In Toronto</main>
    </>
  );
}
