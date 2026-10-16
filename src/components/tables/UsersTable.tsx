import { ActionIcon, Button, CopyButton, Menu, Table } from "@mantine/core";
import type { ResponseUserResponse } from "../../api/model";
import { format } from "date-fns";
import {
  DotsThreeVerticalIcon,
  EyesIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  WarningIcon,
  WheelchairIcon,
} from "@phosphor-icons/react";
import { defineUserRoleLabel } from "../../lib/utils";

interface TableProps {
  data: ResponseUserResponse[];
  isEmployee?: boolean;
}

export default function UsersTable({ data, isEmployee = false }: TableProps) {
  const rows = data.map((element) => {
    const date = format(element.created_at as string, "dd.MM.yy");
    const role = defineUserRoleLabel(element.role!);
    return (
      <Table.Tr key={element.id}>
        <Table.Td>
          {element.first_name} {element.last_name}
        </Table.Td>
        <Table.Td>
          {element.phone_number ? (
            <CopyButton value={element.phone_number}>
              {({ copied, copy }) => (
                <Button
                  size="compact-xs"
                  color={copied ? "blue" : "teal"}
                  onClick={copy}
                >
                  {copied ? "Nusxalandi" : "+" + element.phone_number}
                </Button>
              )}
            </CopyButton>
          ) : (
            "-"
          )}
        </Table.Td>
        <Table.Td>{role}</Table.Td>
        <Table.Td>
          <CopyButton value={`${element.external_user_id}`}>
            {({ copied, copy }) => (
              <Button
                size="compact-xs"
                color={copied ? "teal" : "blue"}
                onClick={copy}
              >
                {copied ? "Nusxalandi" : element.external_user_id}
              </Button>
            )}
          </CopyButton>
        </Table.Td>
        <Table.Td>{date}</Table.Td>
        <Table.Td>
          <Menu shadow="md" width={200} position="bottom">
            <Menu.Target>
              <ActionIcon variant="transparent">
                <DotsThreeVerticalIcon />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<EyesIcon size={14} />}>
                Ko'rish
              </Menu.Item>
              <Menu.Item leftSection={<PencilIcon size={14} />}>
                Tahrirlash
              </Menu.Item>

              <Menu.Divider />
              <Menu.Item color="orange" leftSection={<WarningIcon size={14} />}>
                Ogohlantirish
              </Menu.Item>
              <Menu.Item color="red" leftSection={<WheelchairIcon size={14} />}>
                Bloklash
              </Menu.Item>
              {isEmployee && (
                <Menu.Item color="red" leftSection={<UserIcon size={14} />}>
                  Xodimlikni olish
                </Menu.Item>
              )}
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
    <Table.ScrollContainer minWidth={100}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nomi</Table.Th>
            <Table.Th>Telefon raqami</Table.Th>
            <Table.Th>Roli</Table.Th>
            <Table.Th>Id</Table.Th>
            <Table.Th>Sana</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
