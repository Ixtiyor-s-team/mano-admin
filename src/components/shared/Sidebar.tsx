import { Box, Container, Flex, NavLink } from "@mantine/core";
import { sidebarItems } from "./data";
import { Link } from "wouter";

export default function Sidebar() {
  return (
    <Container
      style={{ overflowY: "auto", borderRight: "0.5px solid" }}
      className="invisible-scrollbar"
      strategy="grid"
      h="100%"
      w={300}
    >
      <Flex w={"100%"} align={"center"} justify={"center"}>
        HEADER
      </Flex>
      <Box>
        {sidebarItems.map((item) => (
          <NavLink
            key={item.href}
            component={Link}
            href={item.href}
            label={item.title}
            leftSection={item.icon}
          />
        ))}
      </Box>
      <Flex w={"100%"} align={"center"} justify={"center"}>
        FOOTER
      </Flex>
    </Container>
  );
}
