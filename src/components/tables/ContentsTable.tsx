import { ActionIcon, Menu, Table } from "@mantine/core";
import type { ResponseMangaResponse } from "../../api/model";
import { format } from "date-fns";
import { defineContentTypeLabel } from "../../lib/utils";
import {
  ChatCircleDotsIcon,
  DotsThreeVerticalIcon,
  ListNumbersIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { Link } from "wouter";
import { PATHS } from "../../lib/paths";

export default function ContentsTable({
  data,
}: {
  data: ResponseMangaResponse[];
}) {
  const rows = data.map((element) => {
    const date = format(element.created_at as string, "dd.MM.yy");
    const type = defineContentTypeLabel(element.type!);
    return (
      <Table.Tr key={element.manga_id}>
        <Table.Td>{element.title}</Table.Td>
        <Table.Td>{type}</Table.Td>
        <Table.Td>{date}</Table.Td>
        <Table.Td>{element.age_restriction}</Table.Td>
        <Table.Td>{element.chapters_count}</Table.Td>
        <Table.Td>{element.average_rating}</Table.Td>
        <Table.Td>
          <Menu shadow="md" width={200} position="bottom">
            <Menu.Target>
              <ActionIcon variant="transparent">
                <DotsThreeVerticalIcon />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<ChatCircleDotsIcon size={14} />}>
                Komentariyalar
              </Menu.Item>
              <Menu.Item
                component={Link}
                href={PATHS.CHAPTERS_MANGA(element.manga_id!)}
                leftSection={<ListNumbersIcon size={14} />}
              >
                Boblar
              </Menu.Item>
              <Menu.Item
                component={Link}
                href={PATHS.ADD_CHAPTER_MANGA(element.manga_id!)}
                leftSection={<PlusIcon size={14} />}
              >
                Bob qo'shish
              </Menu.Item>
              <Menu.Item
                component={Link}
                href={PATHS.EDIT_MANGA(element.manga_id!)}
                leftSection={<PencilIcon size={14} />}
              >
                Tahrirlash
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item color="red" leftSection={<TrashIcon size={14} />}>
                O'chirish
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={700}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nomi</Table.Th>
            <Table.Th>Turi</Table.Th>
            <Table.Th>Yaratilgan</Table.Th>
            <Table.Th>Yosh</Table.Th>
            <Table.Th>Boblar</Table.Th>
            <Table.Th>Reyting</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
