import {
  Box,
  Flex,
  Input,
  Select,
  type ComboboxItem,
  type Primitive,
} from "@mantine/core";
import { useQueryParams } from "../../hooks/useQueryParams";

interface FilterProps {
  roleField?: boolean;
}

export default function FilterUsersForm({ roleField = true }: FilterProps) {
  const { getParam, setParam, useDebouncedParam } = useQueryParams();

  const [searchValue, setSearchValue] = useDebouncedParam("search", 300);

  const handleSelectChange = (key: string, value: string | null) => {
    setParam(key, value);
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="start"
      gap="5px"
    >
      <Box w={{ md: "200px", base: "100%" }}>
        <Input
          placeholder="Qidirish"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
      </Box>

      {roleField && (
        <Flex gap={"5px"} w={{ md: "auto", base: "100%" }}>
          <Select
            placeholder="Rol"
            data={roleValues}
            clearable={false}
            value={getParam("role") || null}
            onChange={(val) =>
              handleSelectChange("role", val ? String(val) : null)
            }
            maw={{ md: "150px", base: "100%" }}
            flex={1}
          />
        </Flex>
      )}
    </Flex>
  );
}

const roleValues: ComboboxItem<Primitive>[] = [
  {
    label: "Oddiy",
    value: "user",
  },
  {
    label: "Tarjimon",
    value: "translator",
  },
  {
    label: "Moderator",
    value: "moderator",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Superadmin",
    value: "superadmin",
  },
];
