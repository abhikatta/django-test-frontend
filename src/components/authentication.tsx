"use client";
import { motion } from "motion/react";
import { memo, useEffect, useRef, useState } from "react";
import CustomForm from "./reusable/auth-form";
import { loginSchema, signupSchema } from "@/lib/schemas/auth";
import { PostData } from "@/lib/utils/db-utils";
import { apiRoutes } from "@/lib/constants";
import { AuthFormProps } from "@/types/auth-form";
import { ButtonProps, PillPosition } from "@/types/component-types";
import { FormNavButton } from "./reusable/buttons";
import { Tokens, User } from "@/types/global";
import useUser from "@/hooks/use-user";

export const LoginForm = memo(({ setUser, fetchUser }: AuthFormProps) => (
  <div id="login-tab">
    <CustomForm
      schema={loginSchema}
      onSubmit={async (data) => {
        const tokenData = await PostData<Tokens>({
          url: apiRoutes.accounts.login,
          body: data,
        });
        if (tokenData) {
          const userData = await fetchUser(tokenData);
          if (userData) {
            setUser({ ...userData, ...tokenData });
          }
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
));

LoginForm.displayName = "LoginForm";

export const SignUpForm = memo(
  ({ setUser }: { setUser: AuthFormProps["setUser"] }) => (
    <div id="signup-tab">
      <CustomForm
        schema={signupSchema}
        onSubmit={async (data) => {
          const userData = await PostData<User>({
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
  )
);

SignUpForm.displayName = "SignUpForm";

const Authentication = () => {
  const { setUser, fetchUser } = useUser();
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
            <FormNavButton
              key={index}
              setPillPosition={setPosition}
              {...button}
            />
          ))}
          <motion.div
            id="underline"
            animate={{ ...position }}
            className="border absolute rounded-full border-b-2 bg-accent -z-10"
          />
        </div>
        <div>
          {openTab === "login" ? (
            <LoginForm setUser={setUser} fetchUser={fetchUser} />
          ) : (
            <SignUpForm setUser={setUser} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Authentication;
