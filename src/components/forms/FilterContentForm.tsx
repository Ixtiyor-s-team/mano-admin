import {
  Box,
  Flex,
  Input,
  Select,
  type ComboboxItem,
  type Primitive,
} from "@mantine/core";
import { useQueryParams } from "../../hooks/useQueryParams";
import {
  GetMangaSortBy,
  ResponseMangaResponseAgeRestriction,
} from "../../api/model";

export default function FilterContentForm() {
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
          placeholder="Nom bo'yicha qidirish"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
      </Box>

      <Flex gap={"5px"} w={{ md: "auto", base: "100%" }}>
        <Select
          placeholder="Saralash"
          data={sortByValues}
          clearable={false}
          value={getParam("sortBy") || null}
          onChange={(val) =>
            handleSelectChange("sortBy", val ? String(val) : null)
          }
          maw={{ md: "150px", base: "100%" }}
          flex={1}
        />

        <Select
          placeholder="Yosh chegarasi"
          data={ageRestrictions}
          clearable={false}
          value={getParam("ageRestriction") || null}
          onChange={(val) =>
            handleSelectChange("ageRestriction", val ? String(val) : null)
          }
          maw={{ md: "150px", base: "100%" }}
          flex={1}
        />
      </Flex>
    </Flex>
  );
}

const sortByValues: ComboboxItem<Primitive>[] = [
  {
    label: "Layklar soni",
    value: GetMangaSortBy.most_liked,
  },
  {
    label: "Ko'rishlar soni",
    value: GetMangaSortBy.most_viewed,
  },
  {
    label: "Yuqori reyting",
    value: GetMangaSortBy.highest_rated,
  },
  {
    label: "Eng yangi",
    value: GetMangaSortBy.newest,
  },
  {
    label: "Eng yangi bob",
    value: GetMangaSortBy.latest_chapter,
  },
];

const ageRestrictions: ComboboxItem<Primitive>[] = [
  {
    label: "12+",
    value: ResponseMangaResponseAgeRestriction["12+"],
  },
  {
    label: "16+",
    value: ResponseMangaResponseAgeRestriction["16+"],
  },
  {
    label: "18+",
    value: ResponseMangaResponseAgeRestriction["18+"],
  },
  {
    label: "Barcha",
    value: ResponseMangaResponseAgeRestriction.all,
  },
];
