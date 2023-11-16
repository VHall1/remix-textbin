import type { FieldConfig } from "@conform-to/react";
import { TextField as RTextField } from "@radix-ui/themes";
import { Error } from "./error";

export function TextField({
  label,
  field,
  ...rest
}: {
  label: string;
  field: FieldConfig<string | undefined>;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  required?: boolean;
}) {
  return (
    <label htmlFor={field.name}>
      {label}
      <RTextField.Root id={field.name}>
        <RTextField.Input name={field.name} {...rest} />
      </RTextField.Root>
      <Error>{field.error}</Error>
    </label>
  );
}
