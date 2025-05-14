"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CustomForm from "./auth-forms";
import { loginSchema, signupSchema } from "@/lib/schema";
import { PostData } from "@/lib/db-utils";
import { apiRoutes } from "@/lib/constants";
import { ButtonProps, PillPosition } from "@/types/auth-form";
import useUser from "@/hooks/use-user";

const Button = ({ name, label, onClick, setPillPosition }: ButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const onButtonClick = () => {
    onClick();
    if (ref.current) {
      const { width, left, height } = ref.current.getBoundingClientRect();
      setPillPosition({
        width,
        left,
        height,
      });
    }
  };
  return (
    <button
      ref={ref}
      name={name}
      className="cursor-pointer text-3xl rounded-full px-10 py-2 w-[10rem] bg-transparent"
      onClick={onButtonClick}>
      {label}
    </button>
  );
};

const Authentication = () => {
  const { setUser } = useUser();
  const [openTab, setOpenTab] = useState<"login" | "signup">("login");
  const [position, setPosition] = useState<PillPosition>({
    left: 0,
    width: 0,
    height: 0,
  });
  const parentRef = useRef<HTMLDivElement | null>(null);
  const buttons: Omit<ButtonProps, "setPillPosition">[] = [
    {
      label: "Login",
      name: "login",
      onClick: () => setOpenTab("login"),
    },
    {
      label: "Signup",
      name: "signup",
      onClick: () => setOpenTab("signup"),
    },
  ];

  useEffect(() => {
    if (parentRef.current) {
      const { width, left, height } = parentRef.current.getBoundingClientRect();
      setPosition({
        width: width / 2,
        left,
        height,
      });
    }
  }, []);

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-lg">
        <div
          ref={parentRef}
          className="flex flex-row items-center w-full justify-between">
          {buttons.map((button, index) => (
            <Button key={index} setPillPosition={setPosition} {...button} />
          ))}
          <motion.div
            id="underline"
            animate={{ ...position }}
            className="border absolute rounded-full border-b-2 bg-accent -z-10"
          />
        </div>
        <div>
          {openTab === "login" ? (
            <div id="login-tab">
              <CustomForm
                schema={loginSchema}
                onSubmit={async (data) => {
                  const userData = await PostData({
                    url: apiRoutes.accounts.login,
                    body: data,
                  });
                  if (userData) {
                    setUser(userData);
                  }
                }}
                defaultValues={{ username: "", password: "" }}
                fields={[
                  {
                    name: "username",
                    label: "Email",
                    type: "email",
                  },
                  {
                    name: "password",
                    label: "Password",
                    type: "password",
                  },
                ]}
              />
            </div>
          ) : (
            <div id="signup-tab">
              <CustomForm
                schema={signupSchema}
                onSubmit={async (data) => {
                  console.log("data", data);
                  const userData = await PostData({
                    url: apiRoutes.accounts.signup,
                    body: data,
                  });
                  if (userData) {
                    setUser(userData);
                  }
                }}
                defaultValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  password: "",
                  confirm_password: "",
                }}
                fields={[
                  {
                    name: "first_name",
                    label: "First Name",
                    type: "text",
                  },
                  {
                    name: "last_name",
                    label: "Last Name",
                    type: "text",
                  },
                  {
                    name: "email",
                    label: "Email",
                    type: "email",
                  },
                  {
                    name: "password",
                    label: "Password",
                    type: "password",
                  },
                  {
                    name: "confirm_password",
                    label: "Confirm Password",
                    type: "password",
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Authentication;
