import { ActionIcon, Table } from "@mantine/core";
import type { ResponseMangaResponse } from "../../api/model";
import { format } from "date-fns";
import { defineContentTypeLabel } from "../../lib/utils";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";

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
          <ActionIcon variant="transparent">
            <DotsThreeVerticalIcon />
          </ActionIcon>
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
