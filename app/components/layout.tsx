import { Container } from "@radix-ui/themes";
import { type PropsWithChildren } from "react";
import Navbar from "~/components/navbar";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  );
};
