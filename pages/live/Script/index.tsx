import MonacoComponent from "@/pages/Components/monaco";
import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();

  useEffect(() => {
    async function Session() {
      const session = await getSession();
      if (!session) {
        router.replace("/");
      }
    }
    Session();
  });

  return (
    <div>
      <MonacoComponent />
    </div>
  );
}

export default index;
