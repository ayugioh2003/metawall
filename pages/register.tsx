import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import login from "../public/image/login.svg";
import { Button } from "../stories/modules/button/Button";
import { Input } from "../stories/modules/input/Input";
import { useForm } from "react-hook-form";

const Register: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data: any) => {
    console.log("login", data);
    router.push("/post");
  };
  return (
    <div>
      <Head>
        <title>MetaWall</title>
        <meta name="description" content="MetaWall" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center h-full min-h-screen bg-c-bg">
        <div className="flex max-w-[869px] max-h-[635px] min-w-[600px] border-2 border-solid border-dark py-[60px] px-12 bg-c-bg shadow-main">
          <div className="w-1/2 pr-6">
            <Image src={login} objectFit="cover"></Image>
          </div>
          <div className="w-1/2 flex flex-col items-center pl-6">
            <h1 className="text-6xl text-primary font-paytone font-black leading-1.4">
              MetaWall
            </h1>
            <h2 className="text-2xl text-dark font-helvetica font-bold leading-snug">
              註冊
            </h2>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="暱稱"
                className="mt-4"
                register={register("userName", { required: true })}
                error={{
                  errors: errors.userName,
                  requiredError: "請輸入暱稱",
                }}
              />
              <Input
                placeholder="Email"
                className="mt-3"
                register={register("email", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
                })}
                error={{
                  errors: errors.email,
                  requiredError: "請輸入帳號",
                  patternError: "email 格式有誤",
                }}
              />
              <Input
                type="password"
                placeholder="Password"
                className="mt-3"
                register={register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/,
                })}
                error={{
                  errors: errors.password,
                  requiredError: "請輸入密碼",
                  patternError: "密碼長度應大於8個字元，並字母與數字混合",
                }}
              />
              <Button
                type="submit"
                label="註冊"
                className="my-4"
                disable={!isValid}
              />
            </form>

            <Link href="/">
              <span className="text-dark">已有帳號？前往登入</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
