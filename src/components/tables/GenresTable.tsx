import { ActionIcon, Menu, Table } from "@mantine/core";
import type { ResponseGenreResponse } from "../../api/model";
import { format } from "date-fns";
import {
  DotsThreeVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@phosphor-icons/react";

interface TableProps {
  data: ResponseGenreResponse[];
  openUpsertModal: () => void;
  openDeleteModal: () => void;
  setUpsertData: (data: null | ResponseGenreResponse) => void;
  setDeleteData: (data: null | ResponseGenreResponse) => void;
}

export default function GenresTable({
  data,
  openUpsertModal,
  setUpsertData,
  openDeleteModal,
  setDeleteData,
}: TableProps) {
  const rows = data.map((element) => {
    const date = format(element.created_at as string, "dd.MM.yy");
    return (
      <Table.Tr key={element.genre_id}>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{date}</Table.Td>
        <Table.Td>
          <Menu shadow="md" width={200} position="bottom">
            <Menu.Target>
              <ActionIcon variant="transparent">
                <DotsThreeVerticalIcon />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  setUpsertData(element);
                  openUpsertModal();
                }}
                leftSection={<PencilIcon size={14} />}
              >
                Tahrirlash
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                onClick={() => {
                  setDeleteData(element);
                  openDeleteModal();
                }}
                color="red"
                leftSection={<TrashIcon size={14} />}
              >
                O'chirish
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={100}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nomi</Table.Th>
            <Table.Th>Sana</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
