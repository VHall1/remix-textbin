import type { FieldConfig } from "@conform-to/react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { IconButton, TextField } from "@radix-ui/themes";
import * as React from "react";
import { Error } from "./error";

export function PasswordField({
  field,
}: {
  field: FieldConfig<string | undefined>;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <label htmlFor={field.name}>
      Password
      <TextField.Root id={field.name}>
        <TextField.Input
          name={field.name}
          type={!showPassword ? "password" : undefined}
        />
        <TextField.Slot>
          <IconButton
            type="button"
            variant="ghost"
            onClick={() =>
              setShowPassword((oldShowPassword) => !oldShowPassword)
            }
          >
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
      <Error>{field.error}</Error>
    </label>
  );
}
