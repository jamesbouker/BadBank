import Card from "../components/Card/card";
import { useUserContext } from "../contexts/UserContextProvider";

export default function Home() {
  const { activeUser } = useUserContext();
  return (
    <>
      <h2>Home</h2>
      <Card
        header="Bad Bank Landing Module"
        title={
          "Welcome to the Bank" +
          (activeUser != null ? ` ${activeUser.name}` : "")
        }
        text="You can move around the bank using the nav bar"
      />
    </>
  );
}
