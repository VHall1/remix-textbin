import { useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { Avatar, Box, Card, Container, Flex, Text } from "@radix-ui/themes";
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import "~/build-styles/routes/login/.styles.css";
import { getTheme } from "~/store/theme/theme.server";
import type { Theme } from "~/store/theme/util";

const schema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData);
  const submission = parse(formData, { schema });
  console.log(submission);
}

export default function App() {
  // const data = useLoaderData<typeof loader>();
  const lastSubmission = useActionData<typeof action>();
  const [form] = useForm({
    lastSubmission,
  });

  return (
    <Container className="Login">
      <Card style={{ maxWidth: 240 }}>
        <Form method="post" {...form.props}>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                Teodros Girmay
              </Text>
              <Text as="div" size="2" color="gray">
                Engineering
              </Text>
            </Box>
          </Flex>
        </Form>
      </Card>
    </Container>
  );
}

export type LoaderData = {
  theme: Theme;
};

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const { theme } = await getTheme(request);

  const data: LoaderData = {
    theme,
    // themeSource: source,
    // user: user,
    // origin: getDomainUrl(request),
    // path: new URL(request.url).pathname,
    // ENV: {
    //   SITE_TITLE: process?.env?.SITE_TITLE || "Site Title",
    //   RECAPTCHA_ENABLED:
    //     process.env.NODE_ENV === "development"
    //       ? "false"
    //       : process.env.RECAPTCHA_ENABLED,
    //   RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    // },
  };

  return json(data);
};
