import { Button, TextInput } from "@tremor/react";
import { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

export default function InputText() {
  const [userInfo, setUserInfo] = useState({ username: "" });
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      username: userInfo.username,
      redirect: false,
    });

    if (res?.ok === true) {
      try {
        await axios.post("/api/v1/CreateAccount", {
          username: userInfo.username,
        });
        router.push('/live/Script')
      } catch (err) {
        console.error("Error creating user:", err);
      }
    }
  };

  return (
    <>
      <div className="mx-auto max-w-sm space-y-8">
        <h2 className="text-center text-[24px] font-[800]">
          Welcome to signup system
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <TextInput
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, username: target.value })
              }
              type="text"
              placeholder="Type username"
              className="mb-[16px]"
            />
          </div>
          <Button type="submit" className="w-full" style={{ color: "white" }}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
