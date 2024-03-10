import React, { useState, useEffect } from "react";
import InputText from "./Components/InputText";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    async function Session() {
      const session = await getSession();
      if (session) {
        await axios
          .get(`/api/v1/Andorid/${session.user?.name}/SendScript`)
          .then((res) => {
            if (res.status === 200) {
              router.push("/live/Script");
            }
          })
          .catch(async (err) => {
            if (err.response.data.error === "you need to login.") {
              await signOut({ callbackUrl: "/" });
            } else {
              console.log(err);
            }
          });
      }
    }
    Session();
  });

  return (
    <>
      <div className="relative flex p-[16px_0px_16px_16px]">
        <div className="h-[calc(100%+90px)] flex flex-col m-[0_auto] p-[0px_16px_16px] overflow-visible">
          <div className="relative grid grid-cols-[1fr_auto] w-[100%] gap-[16px] p-[0px_0px]">
            <div className="flex flex-col gap-[16px] rounded-[8px]">
              <div className="Background relative top-[130%] flex flex-col p-[16px] w-[500px] h-[250px] rounded-[8px] shadow-none bg-[#0e0e0e] items-center place-content-center place-items-center">
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
