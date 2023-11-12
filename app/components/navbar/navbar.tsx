import { PlusIcon } from "@radix-ui/react-icons";
import { Avatar, Button, DropdownMenu, Text } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";
import "~/build-styles/components/navbar/navbar.css";
import { useColourMode } from "~/store/theme";

export default function Navbar() {
  return (
    <header className="Navbar">
      <div className="Navbar--InnerContainer">
        <div className="Navbar--Links">
          <Button variant="soft">
            <PlusIcon />
            New Paste
          </Button>
        </div>
        <ProfileMenu>
          <Button variant="ghost" className="Navbar--Profile NavbarProfile">
            <div className="NavbarProfile--Text">
              <Text size="3">Guest</Text>
              <Text size="1">Sign up or login</Text>
            </div>
            <Avatar
              fallback="G"
              radius="full"
              className="NavbarProfile--Avatar"
            />
          </Button>
        </ProfileMenu>
      </div>
    </header>
  );
}

const ProfileMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const { setMode } = useColourMode();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft">
        <DropdownMenu.Item>Sign up</DropdownMenu.Item>
        <DropdownMenu.Item>Login</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Colour mode</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item onClick={() => setMode("inherit")}>
              Use device theme
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setMode("dark")}>
              Dark mode
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setMode("light")}>
              Light mode
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
