import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import login from "../public/image/login.svg";
import { Button } from "../stories/modules/button/Button";
import { Input } from "../stories/modules/input/Input";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../store/states";

const Home: NextPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
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
        <div className="flex max-w-[869px] max-h-[535px] min-w-[600px] border-2 border-solid border-dark py-[70px] px-12 bg-c-bg shadow-main">
          <div className="w-1/2 pr-6">
            <Image src={login} objectFit="cover"></Image>
          </div>
          <div className="w-1/2 flex flex-col items-center pl-6">
            <h1 className="text-6xl text-primary font-paytone font-black leading-1.4">
              MetaWall
            </h1>
            <h2 className="text-2xl text-dark font-helvetica font-bold leading-snug mb-9">
              到元宇宙展開全新社交圈
            </h2>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

              <Input
                defaultValue={userInfo.email}
                placeholder="Email"
                className="mt-4"
                register={register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i })}
                error={{
                  errors: errors.email,
                  requiredError: "請輸入帳號",
                  patternError: "email 格式有誤",
                }}
              />
              <Input
                type="password"
                defaultValue={userInfo.password}
                placeholder="Password"
                className="mt-4"
                register={register("password", { required: true, minLength: 6 })}
                error={{
                  errors: errors.password,
                  requiredError: "請輸入密碼",
                  minLengthError: "密碼長度應大於6個字元",
                }}
              />
              <Button
                type="submit"
                label="登入"
                className="my-4"
              />
            </form>
            <Link href="/register">
              <span className="text-dark">註冊帳號</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
