import { Box, LoadingOverlay } from "@mantine/core";
import HeaderTitle from "../../components/shared/HeaderTitle";
import { useGetGenres } from "../../api/generated";
import { useQueryParams } from "../../hooks/useQueryParams";
import GenresTable from "../../components/tables/GenresTable";
import FilterGenresForm from "../../components/forms/FilterGenresForm";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import type { ResponseGenreResponse } from "../../api/model";
import UpsertGenreModal from "../../components/modals/UpsertGenreModal";
import DeleteGenreModal from "../../components/modals/DeleteGenreModal";

export default function GenresPage() {
  const { getParam } = useQueryParams();
  const search = getParam("search");
  const { data, isLoading } = useGetGenres({
    search: search ?? "",
  });
  const [upsertModalOpen, { open: openUpsertModal, close: closeUpsertModal }] =
    useDisclosure(false);
  const [deleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [dataToUpsert, setDataToUpsert] =
    useState<null | ResponseGenreResponse>();
  const [dataToDelete, setDataToDelete] =
    useState<null | ResponseGenreResponse>();
  return (
    <Box w={"100%"}>
      <HeaderTitle
        title="Janrlar"
        buttonText="Janr qo'shish"
        onClick={() => {
          setDataToUpsert(null);
          openUpsertModal();
        }}
      />
      <FilterGenresForm />
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
            <GenresTable
              setUpsertData={setDataToUpsert}
              openUpsertModal={openUpsertModal}
              openDeleteModal={openDeleteModal}
              setDeleteData={setDataToDelete}
              data={data?.data ?? []}
            />
            <UpsertGenreModal
              isOpened={upsertModalOpen}
              closeModal={closeUpsertModal}
              setData={setDataToUpsert}
              data={dataToUpsert ?? null}
            />
            <DeleteGenreModal
              opened={deleteModalOpen}
              onClose={closeDeleteModal}
              setData={setDataToDelete}
              data={dataToDelete!}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
