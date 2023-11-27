import { useForm, type Submission } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { type User } from "@prisma/client";
import { Button, Card, Container } from "@radix-ui/themes";
import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type TypedResponse,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import "~/build-styles/routes/login/styles.css";
import { TextField } from "~/components/forms";
import { useUser } from "~/store/user/user";
import { getUser, getUserSession } from "~/store/user/user.server";

export default function Login() {
  const { setUser } = useUser();
  const data = useActionData<typeof action>();
  const lastSubmission = data?.submission;

  const [form, { username }] = useForm({
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
  });

  if (data?.user) {
    setUser(data.user);
  }

  return (
    <Container className="Login">
      <Card style={{ maxWidth: 240 }}>
        <Form method="post" {...form.props}>
          <TextField label="Username" field={username} />
          <Button type="submit">login</Button>
        </Form>
      </Card>
    </Container>
  );
}

const schema = z.object({
  username: z.string({ required_error: "Username is required" }),
  // password: z.string({ required_error: "Password is required" }),
});

export async function action({ request }: ActionFunctionArgs): Promise<
  TypedResponse<{
    user: User | undefined;
    submission: Submission<any>;
  }>
> {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (!submission.value || submission.intent !== "submit") {
    return json({ user: undefined, submission });
  }

  // TODO: login auth logic here

  const userSession = await getUserSession(request);
  const user: User = {
    id: 1,
    username: submission.value.username,
  };

  userSession.setUser(user);
  return json(
    { user, submission },
    {
      headers: { "Set-Cookie": await userSession.commit() },
    }
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  if (user) {
    return redirect("/");
  }
  return null;
};
