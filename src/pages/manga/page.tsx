import { Box, LoadingOverlay } from "@mantine/core";
import HeaderTitle from "../../components/shared/HeaderTitle";
import FilterContentForm from "../../components/forms/FilterContentForm";
import { useGetManga } from "../../api/generated";
import { useQueryParams } from "../../hooks/useQueryParams";
import type {
  GetMangaSortBy,
  ResponseMangaResponseAgeRestriction,
} from "../../api/model";
import ContentsTable from "../../components/tables/ContentsTable";
import CustomPagination from "../../components/shared/AppPagination";

export default function MangaPage() {
  const { getParam } = useQueryParams();

  const search = getParam("search");
  const sortBy = getParam("sortBy") as GetMangaSortBy;
  const ageRestriction = getParam(
    "ageRestriction",
  ) as ResponseMangaResponseAgeRestriction;

  const page = Number(getParam("page")) || 1;
  const limit = Number(getParam("limit")) || 10;

  const { data, isLoading } = useGetManga({
    search: search ?? "",
    sort_by: sortBy ?? "latest_chapter",
    age_restrictions: ageRestriction ?? "all",
    limit: limit,
    page: page,
  });

  return (
    <Box w={"100%"}>
      <HeaderTitle title="Barcha asarlar" buttonText="Asar qo'shish" />
      <FilterContentForm />

      <Box mt="sm">
        {isLoading ? (
          <Box
            w={"100%"}
            mih={"200px"}
            display={"flex"}
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <LoadingOverlay visible />
          </Box>
        ) : (
          <>
            <ContentsTable data={data?.data ?? []} />
            <CustomPagination total={data?.total ?? 0} defaultLimit={10} />
          </>
        )}
      </Box>
    </Box>
  );
}
