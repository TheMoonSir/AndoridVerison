import React, { useState, useEffect } from "react";
import InputText from "./Components/InputText";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    async function Session() {
      const session = await getSession();
      if (session) {
        router.push("/live/Script");
      }
    }
    Session();
  });

  return (
    <>
      <div className="relative flex p-[16px_0px_16px_16px]">
        <div className="h-[calc(100%+90px)] flex flex-col m-[350px_auto] p-[0px_16px_16px] overflow-visible">
          <div className="relative grid grid-cols-[1fr_auto] w-[100%] gap-[16px] p-[0px_0px]">
            <div className="flex flex-col gap-[16px] rounded-[8px]">
              <div className="Background flex flex-col p-[50px_100px_49px] rounded-[8px] shadow-none bg-[#0e0e0e]">
                <InputText />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
