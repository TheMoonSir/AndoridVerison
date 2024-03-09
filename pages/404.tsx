"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
function Home() {
  const [client, setclient] = useState<Boolean | null>(null);
  const [width, setwidth] = useState<Boolean | null>(null);

  useEffect(() => {
    const sizeclient = () => {
      const body = document.body.clientWidth;
      if (body <= 1340) {
        setclient(true);
      } else {
        setclient(false);
      }
      if (body <= 1356) {
        setwidth(true);
      } else {
        setwidth(false);
      }
    };
    sizeclient();
    window.addEventListener("resize", sizeclient);
    return () => {
      window.removeEventListener("resize", sizeclient);
    };
  }, []);

  return (
    <>
      <section className="p-[40px]">
        <div className={`relative`}>
          <h2
            className={`font-bold text-zinc-700 ${
              client ? "text-[30px]" : "text-[45px]"
            }`}
          >
            Oof.. you on wrong page!
          </h2>
          <p
            className={`font-[500] mb-[30px] text-zinc-700 ${
              client ? "text-[10px]" : ""
            }`}
          >
            You on wrong page or maybe we deleted the page that you trying to
            look inside!
            <br></br>
          </p>
          <div className="hover:animate-pulse text-zinc-500">
            <Link
              className="bg-gray-200 dark:bg-zinc-800 p-[20px] rounded"
              href={"/"}
            >
              Bring me to home!
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
