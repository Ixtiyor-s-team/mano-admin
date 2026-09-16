import { Box, Button, Title } from "@mantine/core";
import React from "react";
import { Link } from "wouter";
interface Props {
  title: string;
  buttonText?: string;
  children?: React.ReactNode;
  href?: string;
}

export default function HeaderTitle({
  title,
  buttonText,
  href,
  children,
}: Props) {
  return (
    <Box
      w={"100%"}
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0",
      }}
    >
      <Title>{title}</Title>
      {children ??
        (href ? (
          <Link href={href}>
            <Button>{buttonText}</Button>
          </Link>
        ) : (
          <Button>{buttonText}</Button>
        ))}
    </Box>
  );
}
