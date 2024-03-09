import { Button, TextInput } from "@tremor/react";
import { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";

export function InputText() {
  const [userInfo, setUserInfo] = useState({ email: "", username: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    console.log(userInfo.username);
    console.log(userInfo.email);

    const res = await signIn("credentials", {
      username: userInfo.username, // Make sure to use 'username' here
      email: userInfo.email,
      redirect: true,
    });

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
