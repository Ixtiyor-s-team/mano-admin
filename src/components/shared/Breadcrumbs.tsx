import { Anchor, Breadcrumbs as MantineBreadcrumbs } from "@mantine/core";

export default function Breadcrumbs() {
  return (
    <>
      <MantineBreadcrumbs separator="→" separatorMargin="md">
        {items}
      </MantineBreadcrumbs>
    </>
  );
}
const items = [
  { title: "Mantine", href: "#" },
  { title: "Mantine hooks", href: "#" },
  { title: "use-id", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
