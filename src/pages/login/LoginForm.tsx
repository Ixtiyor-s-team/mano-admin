import { Anchor, Button, Container, Flex, PinInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import ThemeButton from "../../components/ui/ThemeButton";
import { useAuth } from "../../features/user/user.context";

export default function LoginForm() {
  const { login, mutationPending } = useAuth();
  const form = useForm({
    initialValues: {
      code: "",
    },

    validate: {
      code: (value) => (value.length !== 6 ? "6 xonali kod kiriting" : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    login(values.code);
  };
  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="border"
      style={{
        border: "1px solid",
        padding: "10px 20px",
        borderRadius: "20px",
      }}
    >
      <Flex
        style={{ position: "relative" }}
        justify={"center"}
        align={"center"}
        w={"100%"}
        direction={"column"}
      >
        <ThemeButton
          variant="transparent"
          style={{ position: "absolute", right: 0, top: 0 }}
        />
        <p
          style={{
            fontSize: "20px",
            fontWeight: 600,
            padding: 0,
            margin: 0,
            marginTop: 20,
          }}
        >
          Mano adminga kirish
        </p>
        <Anchor
          target="_blank"
          href="https://t.me/mano_enrollment_robot?start=website"
          style={{ fontSize: "15px", padding: 0, paddingBottom: 10, margin: 0 }}
        >
          Kodni olish
        </Anchor>
        <Container
          style={{ border: "1px solid", borderRadius: "10px" }}
          p={"10px"}
        >
          <PinInput
            disabled={mutationPending}
            length={6}
            onComplete={(value) => {
              form.setFieldValue("code", value);

              if (value.length === 6) {
                form.onSubmit(handleSubmit)();
              }
            }}
            {...form.getInputProps("code")}
          />

          <Button
            disabled={mutationPending}
            variant=""
            w={"100%"}
            type="submit"
            mt="md"
            loading={mutationPending}
            loaderProps={{ type: "dots" }}
          >
            Tasdiqlash
          </Button>
        </Container>
      </Flex>
    </form>
  );
}
