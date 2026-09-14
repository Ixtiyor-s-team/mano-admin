import { ActionIcon, Box, Flex, Text } from "@mantine/core";
import { SignOutIcon } from "@phosphor-icons/react";
import ThemeButton from "../ui/ThemeButton";

export default function Navbar() {
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
        <ActionIcon size={"lg"} variant="outline">
          <SignOutIcon />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
