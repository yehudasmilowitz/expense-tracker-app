import { SignInButton } from "@clerk/nextjs";

const Guest = () => {
  return (
    <main className="guest">
      <h1>Welcome</h1>
      <p>Please sign in to manage your transactions</p>
      <SignInButton />
    </main>
  );
};

export default Guest;
