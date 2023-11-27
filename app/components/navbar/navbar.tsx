import { CheckCircledIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Link,
  Text,
} from "@radix-ui/themes";
import type { PropsWithChildren } from "react";
import "~/build-styles/components/navbar/navbar.css";
import { useTheme } from "~/store/theme/theme";
import { Theme } from "~/store/theme/util";
import { useUser } from "~/store/user/user";
import { Link as RemixLink } from "@remix-run/react";

export default function Navbar() {
  const { user } = useUser();

  return (
    <header className="Navbar">
      <div className="Navbar--InnerContainer">
        <div className="Navbar--Links">
          <Button variant="soft" asChild>
            <RemixLink to="/">
              <PlusIcon />
              New Paste
            </RemixLink>
          </Button>
        </div>
        <ProfileMenu>
          <Button variant="ghost" className="Navbar--Profile NavbarProfile">
            <div className="NavbarProfile--Text">
              {user ? (
                <Text size="3">{user.username}</Text>
              ) : (
                <>
                  <Text size="3">Guest</Text>
                  <Text size="1">Sign up or login</Text>
                </>
              )}
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

const CustomCheckItem = ({ checked = false }: { checked?: boolean }) => {
  if (!checked) {
    return null;
  }

  return (
    <Flex ml="2" align="center" justify="center">
      <CheckCircledIcon />
    </Flex>
  );
};

const ProfileMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useUser();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft">
        {user ? (
          <DropdownMenu.Item onClick={logout}>Logout</DropdownMenu.Item>
        ) : (
          <>
            <Link asChild>
              <RemixLink to="/signup">
                <DropdownMenu.Item>Sign up</DropdownMenu.Item>
              </RemixLink>
            </Link>
            <Link asChild>
              <RemixLink to="/login">
                <DropdownMenu.Item>Login</DropdownMenu.Item>
              </RemixLink>
            </Link>
          </>
        )}
        <DropdownMenu.Separator />
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Colour mode</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item onClick={() => setTheme(Theme.DARK)}>
              Dark mode
              <CustomCheckItem checked={theme === Theme.DARK} />
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setTheme(Theme.LIGHT)}>
              Light mode
              <CustomCheckItem checked={theme === Theme.LIGHT} />
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
