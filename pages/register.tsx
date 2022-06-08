import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import login from "../public/image/login.svg";
import { Button } from "../stories/modules/button/Button";
import { Input } from "../stories/modules/input/Input";
import { useForm } from "react-hook-form";
import { fetchLogin, fetchSignup } from "../api/auth";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { userState, loginState, loadingState } from "../store/states";

const Register: NextPage = () => {
  const router = useRouter();
  const [_isLoading, setIsLoading] = useRecoilState(loadingState);
  const [_userInfo, setUserInfo] = useRecoilState(userState);
  const [_isLogin, setIsLogin] = useRecoilState(loginState);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const res = await fetchSignup(data);
    if (res.status !== 200) {
      setIsLoading(false);
      Swal.fire({
        title: "Error!",
        text: res.message,
        icon: "error",
        confirmButtonText: "請修正後重試一次",
      });
      return;
    }
    if (res?.status === 200) {
      const loginRes = await fetchLogin({
        email: data.email,
        password: data.password,
      });
      if (!loginRes.data) {
        setIsLoading(false);
        Swal.fire({
          title: "Error!",
          text: "登入失敗",
          icon: "error",
          confirmButtonText: "我知道了",
        });
        return;
      }
      setUserInfo(loginRes.data.data.user);
      setIsLogin(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", loginRes.data.data.token);
      }
    }
    setIsLoading(false);
    router.push("/post");
  };
  return (
    <div>
      <main className="flex justify-center items-center h-full min-h-screen bg-c-bg">
        <div className="flex max-w-[869px] max-h-[635px] min-w-[600px] border-2 border-solid border-dark py-[60px] px-12 bg-c-bg shadow-main">
          <div className="w-1/2 pr-6">
            <Image src={login} objectFit="cover" alt="registerLogo"></Image>
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
                register={register("name", { required: true })}
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
                className="my-4 cursor-pointer"
                disable={!isValid}
              />
            </form>

            <Link href="/">
              <span className="text-dark cursor-pointer">
                已有帳號？前往登入
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
