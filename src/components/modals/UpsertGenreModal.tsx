import { Box, Button, Input, Modal } from "@mantine/core";
import type { ResponseGenreResponse } from "../../api/model";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { getGetGenresQueryKey, usePostGenres } from "../../api/generated";
import { appNotification } from "../../lib/app-notification";
import { useQueryClient } from "@tanstack/react-query";

interface UpsertModalProps {
  isOpened: boolean;
  data: ResponseGenreResponse | null;
  closeModal: () => void;
  setData: (data: null | ResponseGenreResponse) => void;
}
export default function UpsertGenreModal({
  isOpened,
  data,
  closeModal,
  setData,
}: UpsertModalProps) {
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: {
      name: data ? data.name! : "",
    },

    validate: {
      name: (value) => (value.trim().length === 0 ? "Janrni kiriting" : null),
    },
  });
  useEffect(() => {
    form.setValues({
      name: data?.name ?? "",
    });
  }, [data]);
  const handleClose = () => {
    closeModal();
    setData(null);
  };
  const { mutate: upsertGenre, isPending } = usePostGenres();
  const handleSubmit = (values: typeof form.values) => {
    upsertGenre(
      {
        data: {
          name: values.name,
          id: data ? data.genre_id! : undefined,
        },
      },
      {
        onSuccess: () => {
          handleClose();
          queryClient.invalidateQueries({ queryKey: getGetGenresQueryKey() });
          appNotification.success(data ? "Janr tahrirlandi" : "Janr qo'shildi");
        },
        onError: (error: any) => {
          const msg = error.response.data.error;
          appNotification.error(msg);
        },
      },
    );
  };
  return (
    <Modal
      opened={isOpened}
      onClose={handleClose}
      title={data ? "Janrni tahrirlash" : "Janr qo'shish"}
      closeButtonProps={{ disabled: isPending }}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Input placeholder="Janr nomi" {...form.getInputProps("name")} />
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
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Bekor qilish
          </Button>
          <Button
            loading={isPending}
            disabled={isPending}
            variant="filled"
            type="submit"
          >
            {data ? "Tahrirlash" : "Qo'shish"}
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
