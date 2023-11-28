import { useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { Button, Card, Container, Flex } from "@radix-ui/themes";
import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { TextField } from "~/components/forms";
import { getUser } from "~/store/user/user.server";
import { authenticate } from "~/util/authenticate.server";

export default function Login() {
  const lastSubmission = useActionData<typeof action>();

  const [form, { email }] = useForm({
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
  });

  return (
    <Container
      size={{
        initial: "4",
        xl: "1",
      }}
      className=""
    >
      <Flex height="100%">
        <Card>
          <Form method="post" {...form.props}>
            <TextField label="Email" field={email} />
            <Button type="submit">Get Magic Link</Button>
          </Form>
        </Card>
      </Flex>
    </Container>
  );
}

const schema = z.object({
  email: z.string().email(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (!submission.value || submission.intent !== "submit") {
    return json(submission);
  }
  const {
    value: { email },
  } = submission;
  await authenticate(email);
  // TODO: Send email

  return json(submission);
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  if (user) {
    return redirect("/");
  }
  return null;
};
