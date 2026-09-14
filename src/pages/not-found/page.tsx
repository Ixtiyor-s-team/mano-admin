import { Button, Flex, Text } from "@mantine/core";
import { ArrowLeftIcon, HouseIcon } from "@phosphor-icons/react";
import { useLocation } from "wouter";
import { PATHS } from "../../lib/paths";

export default function NotFound() {
  const [_, navigate] = useLocation();
  return (
    <Flex
      direction={"column"}
      py={"200px"}
      w={"100%"}
      justify={"center"}
      align={"center"}
    >
      <Text fw={700} style={{ fontSize: "50px" }}>
        404
      </Text>
      <Flex gap={"xs"}>
        <Button
          onClick={() => navigate(PATHS.DASHBOARD)}
          leftSection={<ArrowLeftIcon size={17} />}
        >
          Orqaga
        </Button>
        <Button
          onClick={() => history.back()}
          leftSection={<HouseIcon size={17} />}
          variant={"outline"}
        >
          Asosiy sahifa
        </Button>
      </Flex>
    </Flex>
  );
}
