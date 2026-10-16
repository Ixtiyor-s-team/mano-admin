import { Box, LoadingOverlay } from "@mantine/core";
import HeaderTitle from "../../components/shared/HeaderTitle";
import UsersTable from "../../components/tables/UsersTable";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useGetUserList } from "../../api/generated";
import FilterUsersForm from "../../components/forms/FilterUsersForm";
import CustomPagination from "../../components/shared/AppPagination";

const rolesArray = ["admin", "superadmin", "moderator", "translator"];

export default function EmployeesPage() {
  const { getParam } = useQueryParams();

  const search = getParam("search");

  const page = Number(getParam("page")) || 1;
  const limit = Number(getParam("limit")) || 10;

  const { data, isLoading } = useGetUserList({
    search: search ?? "",
    limit: limit,
    page: page,
    roles: rolesArray.join(","),
  });
  return (
    <Box w={"100%"}>
      <HeaderTitle title={"Xodimlar" + ` (${data?.total_count ?? "..."})`} />
      <FilterUsersForm roleField={false} />

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
            <UsersTable isEmployee data={data?.users ?? []} />
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
