import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export default function ThemeButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const toggleTheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };
  return (
    <ActionIcon onClick={toggleTheme} size={"lg"} variant="outline">
      {computedColorScheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </ActionIcon>
  );
}
