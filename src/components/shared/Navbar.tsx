import { ActionIcon, Box, Flex, Text } from "@mantine/core";
import { SignOutIcon } from "@phosphor-icons/react";
import ThemeButton from "../ui/ThemeButton";
import { useAuth } from "../../features/user/user.context";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <Flex
      px={"10px"}
      justify={"space-between"}
      align={"center"}
      w={"100%"}
      h={"60px"}
      style={{
        borderBottom: "0.5px solid",
      }}
    >
      {/* <Breadcrumbs /> */}
      <Text size="xl">Navbar</Text>
      <Box></Box>
      <Flex gap={"xs"}>
        <ThemeButton />
        <ActionIcon onClick={logout} size={"lg"} variant="outline">
          <SignOutIcon />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
