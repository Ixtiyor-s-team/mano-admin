import { Box, Button, Modal } from "@mantine/core";
import type { ResponseGenreResponse } from "../../api/model";
import { getGetGenresQueryKey, useDeleteGenresId } from "../../api/generated";
import { useQueryClient } from "@tanstack/react-query";
import { appNotification } from "../../lib/app-notification";

interface DeleteProps {
  opened: boolean;
  onClose: () => void;
  data: ResponseGenreResponse | null;
  setData: (data: ResponseGenreResponse | null) => void;
}

export default function DeleteGenreModal({
  opened,
  onClose,
  data,
  setData,
}: DeleteProps) {
  const queryClient = useQueryClient();
  const { mutate: deleteGenre, isPending } = useDeleteGenresId();
  const handleClose = () => {
    onClose();
    setData(null);
  };
  const handleDelete = () => {
    deleteGenre(
      { id: data?.genre_id! },
      {
        onSuccess: () => {
          handleClose();
          queryClient.invalidateQueries({ queryKey: getGetGenresQueryKey() });
          appNotification.success("Janr o'hcirildi");
        },
      },
    );
  };
  return (
    <Modal opened={opened} onClose={handleClose} title="Janrni o'chirish">
      <p>{data?.name} - janrini o'chirmoqchimisiz?</p>
      <Box
        w={"100%"}
        mt={10}
        style={{
          display: "flex",
          gap: 5,
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Button disabled={isPending} variant="outline" onClick={handleClose}>
          Bekor qilish
        </Button>
        <Button
          color="red"
          onClick={handleDelete}
          variant="filled"
          type="submit"
          disabled={isPending}
          loading={isPending}
        >
          {"O'chirish"}
        </Button>
      </Box>
    </Modal>
  );
}
