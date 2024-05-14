import Aggrid from "./suppliers-aggrid";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Aggrid />
      {children}
    </>
  );
}
