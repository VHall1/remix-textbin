import type { FieldConfig } from "@conform-to/react";
import { Select } from "@radix-ui/themes";
import { Error } from "./error";

export function AccessControl({
  field,
}: {
  field: FieldConfig<string | undefined>;
}) {
  return (
    <label htmlFor={field.name}>
      Access control
      <Select.Root defaultValue="public" name={field.name}>
        <Select.Trigger />
        <Select.Content>
          <Select.Item value="public">Public</Select.Item>
          <Select.Item value="unlisted">Unlisted</Select.Item>
          <Select.Item value="private">Private</Select.Item>
        </Select.Content>
      </Select.Root>
      <Error>{field.error}</Error>
    </label>
  );
}
