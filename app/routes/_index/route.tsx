import { EyeOpenIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Checkbox,
  Container,
  Section,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import type { MetaFunction } from "@remix-run/node";
import "~/build-styles/routes/_index/.styles.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Container>
      <Section>
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
            <label htmlFor="paste-title">
              Title
              <TextField.Root id="paste-title">
                <TextField.Input />
              </TextField.Root>
            </label>

            <label htmlFor="paste-expiration">
              Expiration
              <TextField.Root id="paste-expiration">
                <TextField.Input />
              </TextField.Root>
            </label>

            <label htmlFor="paste-control">
              Access control
              <TextField.Root id="paste-control">
                <TextField.Input />
              </TextField.Root>
            </label>

            <label htmlFor="paste-password">
              Password
              <TextField.Root id="paste-password">
                <TextField.Input />
                <TextField.Slot>
                  <EyeOpenIcon />
                </TextField.Slot>
              </TextField.Root>
            </label>

            <label>
              <Checkbox defaultChecked />
              Encrypt paste
            </label>
          </div>
        </Card>
      </Section>
    </Container>
  );
}
