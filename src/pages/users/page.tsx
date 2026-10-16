import { Box, LoadingOverlay } from "@mantine/core";
import HeaderTitle from "../../components/shared/HeaderTitle";
import UsersTable from "../../components/tables/UsersTable";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useGetUserList } from "../../api/generated";
import FilterUsersForm from "../../components/forms/FilterUsersForm";
import CustomPagination from "../../components/shared/AppPagination";

export default function UsersPage() {
  const { getParam } = useQueryParams();

  const search = getParam("search");
  const role = getParam("role");

  const page = Number(getParam("page")) || 1;
  const limit = Number(getParam("limit")) || 10;

  const { data, isLoading } = useGetUserList({
    search: search ?? "",
    limit: limit,
    page: page,
    roles: role,
  });
  return (
    <Box w={"100%"}>
      <HeaderTitle
        title={"Foydalanuvchilar" + ` (${data?.total_count ?? "..."})`}
      />
      <FilterUsersForm />

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
            <UsersTable data={data?.users ?? []} />
            <CustomPagination
              total={(data?.total_count ?? 0) as number}
              defaultLimit={10}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
