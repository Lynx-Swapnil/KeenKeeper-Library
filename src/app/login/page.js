import LoginForm from "./login-form";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  return <LoginForm registrationSuccess={params?.registered === "1"} />;
}
