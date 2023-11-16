import { useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Section,
  Text,
  TextArea,
} from "@radix-ui/themes";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import "~/build-styles/routes/_index/.styles.css";
import { PasswordField, TextField } from "~/components/forms";
import { AccessControl } from "./access-control";
import { ACCESS_CONTROL } from "./types";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const schema = z.object({
  title: z.string({ required_error: "Title is required" }),
  expiration: z.date().optional(),
  accessControl: z.enum(ACCESS_CONTROL),
  password: z.string().optional(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData);
  const submission = parse(formData, { schema });
  console.log(submission);
}

export default function Index() {
  const lastSubmission = useActionData<typeof action>();
  const [form, { title, password, expiration, accessControl }] = useForm({
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
  });

  return (
    <Container>
      <Section>
        <Form method="post" {...form.props}>
          <Card className="NewPaste">
            {/* Title */}
            <Box mb="4">
              <PlusIcon />
              <Text size="5">New paste</Text>
            </Box>

            {/* Editor */}
            {/* TODO: Use a better editor here */}
            <TextArea placeholder="Lorem ipsum..." />

            {/* Options */}
            <div className="NewPaste--OptionsContainer">
              <TextField label="Title" field={title} />
              <TextField label="Expiration" field={expiration} type="date" />
              <AccessControl field={accessControl} />
              <PasswordField field={password} />
            </div>

            <label>
              <Checkbox defaultChecked />
              Encrypt paste
            </label>

            <Button variant="soft" type="submit">
              Create new paste
            </Button>
          </Card>
        </Form>
      </Section>
    </Container>
  );
}
