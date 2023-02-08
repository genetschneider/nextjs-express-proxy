import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserContext } from "../context/user-context";

export const OwnHead = () => {
  const { asPath } = useRouter();
  const user = useUserContext();

  useEffect(() => {
    console.log("segment.page", {
      asPath,
      user,
    });
  }, [asPath, user]);

  return (
    <Head>
      <title>Cool page!</title>
    </Head>
  );
};
