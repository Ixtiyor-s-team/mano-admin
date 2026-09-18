import { Box, Flex, Input } from "@mantine/core";
import { useQueryParams } from "../../hooks/useQueryParams";

export default function FilterGenresForm() {
  const { useDebouncedParam } = useQueryParams();
  const [searchValue, setSearchValue] = useDebouncedParam("search", 300);
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="start"
      gap="5px"
    >
      <Box w={{ md: "400px", base: "100%" }}>
        <Input
          placeholder="Nom bo'yicha qidirish"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
      </Box>
    </Flex>
  );
}
