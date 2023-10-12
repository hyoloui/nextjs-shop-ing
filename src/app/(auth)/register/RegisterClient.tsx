"use client";

import styles from "../login/Auth.module.scss";

import React, { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Loader from "@/components/loader/Loader";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import Divider from "@/components/divider/Divider";

import LogoPath from "@/assets/colorful.svg";

const RegisterClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const registerUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== cPassword) {
      return toast.error("비밀번호가 일치하지 않습니다.");
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("👉  user:", user);

        setIsLoading(false);

        toast.success("등록 성공...");
        router.push("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image priority src={LogoPath} alt="logo" width={247} />
          </h1>

          <form action="login" className={styles.form} onSubmit={registerUser}>
            {/* Input */}
            <Input
              email
              autoComplete="new-email"
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
              autoComplete="new-password"
              icon="lock"
              id="regiser-password"
              name="password"
              label="비밀번호"
              placeholder="비밀번호"
              className={styles.control}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              password
              autoComplete="new-password"
              icon="lock"
              id="confirm-password"
              name="password"
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
              className={styles.control}
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />

            <div className={styles.buttonGroup}>
              {/* Button */}

              <Button type="submit" width="100%">
                회원가입
              </Button>

              <Divider />

              <Link href={"/login"}>
                <Button width="100%" secondary>
                  로그인
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterClient;
