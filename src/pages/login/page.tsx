import { Flex } from "@mantine/core";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Flex justify={"center"} align={"center"} h={"100vh"} w={"100%"}>
      <LoginForm />
    </Flex>
  );
}
