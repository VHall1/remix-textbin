import { Text } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";

export const Error: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Text color="red" size="1">
      {children}
    </Text>
  );
};
