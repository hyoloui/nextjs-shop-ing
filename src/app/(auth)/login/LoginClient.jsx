"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

import Loader from "@/components/loader/Loader";
import Input from "@/components/input/Input";
import AutoSignInCheckbox from "@/components/autoSignInCheckbox/AutoSignInCheckbox";
import Divider from "@/components/divider/Divider";
import Button from "@/components/button/Button";

import LogoPath from "@/assets/colorful.svg";

import styles from "./Auth.module.scss";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push("/");
  };

  const loginUser = (event) => {
    event.preventDefault();
    setIsLoading(true);
  };

  const signInWithGoogle = () => {};

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image priority src={LogoPath} alt="logo" width={247} />
          </h1>

          <form action="login" className={styles.form} onSubmit={loginUser}>
            {/* Input */}
            <Input
              email
              icon="letter"
              id="email"
              name="email"
              label="이메일"
              placeholder="아이디(이메일)"
              className={styles.control}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              password
              icon="lock"
              id="password"
              name="password"
              label="비밀번호"
              placeholder="비밀번호"
              className={styles.control}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className={styles.group}>
              {/* 자동 로그인, 비밀번호 수정 */}
              <AutoSignInCheckbox
                checked={isAutoLogin}
                onChange={(e) => setIsAutoLogin(e.target.checked)}
              />
            </div>

            <div className={styles.buttonGroup}>
              {/* Button */}

              <Button type="submit" width="100%">
                로그인
              </Button>

              <Divider />

              <Link href={"/register"}>
                <Button width="100%" secondary>
                  회원가입
                </Button>
              </Link>

              <Divider />
            </div>

            <div>
              {/* Button */}
              <Button onClick={signInWithGoogle}>구글 로그인</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
