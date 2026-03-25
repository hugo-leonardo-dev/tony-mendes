"use server";

import { signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    return { error: "Invalid email or password" };
  }

  redirect("/admin/projects");
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
