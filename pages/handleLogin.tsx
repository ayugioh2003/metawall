import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { check } from "../api/auth";
import { loginState } from "../store/states";

export const HandleLogin = (props: any) => {
  const [handlelLogin, setHandlelLogin] = useRecoilState(loginState);
  const router = useRouter();
  const checkLogin = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!!token) {
        const loginStatus: any = await check(token);
        const isSuccess = loginStatus?.data?.status === "success";
        if (!isSuccess) {
          router.push("/");
          return;
        }
        setHandlelLogin({ isLogin: true });
      }
    }
  };
  const isRenderComponent =
    !!handlelLogin.isLogin ||
    router.pathname === "/" ||
    router.pathname === "/register";

  useEffect(() => {
    checkLogin();
  }, []);

  return <>{isRenderComponent && props.children}</>;
};

export default HandleLogin;
