import { useCallback, useRef, useState } from "react";
import { Button, Stack, Text } from "@sanity/ui";
import { useToast } from "@sanity/ui/toast";
import {
  insert,
  setIfMissing,
  useClient,
  type ArrayOfObjectsInputProps,
} from "sanity";

const BATCH_SIZE = 5;
const API_VERSION = "2024-10-01";

const uniqueKey = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

export function BatchImageInput(props: ArrayOfObjectsInputProps) {
  const { onChange } = props;
  const client = useClient({ apiVersion: API_VERSION });
  const toast = useToast();
  const fileInput = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(
    null,
  );

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const files = Array.from(fileList);
      setProgress({ done: 0, total: files.length });
      onChange(setIfMissing([]));

      try {
        for (let start = 0; start < files.length; start += BATCH_SIZE) {
          const batch = files.slice(start, start + BATCH_SIZE);
          const assets = await Promise.all(
            batch.map((file) =>
              client.assets.upload("image", file, { filename: file.name }),
            ),
          );

          const items = assets.map((asset) => ({
            _type: "imageItem",
            _key: uniqueKey(),
            image: {
              _type: "image",
              asset: { _type: "reference", _ref: asset._id },
            },
          }));

          onChange(insert(items, "after", [-1]));
          setProgress({
            done: Math.min(start + batch.length, files.length),
            total: files.length,
          });
        }

        toast.push({
          status: "success",
          title: `Uploaded ${files.length} image${files.length === 1 ? "" : "s"}`,
        });
      } catch (error) {
        toast.push({
          status: "error",
          title: "Upload failed",
          description: error instanceof Error ? error.message : String(error),
        });
      } finally {
        setProgress(null);
        if (fileInput.current) fileInput.current.value = "";
      }
    },
    [client, onChange, toast],
  );

  return (
    <Stack gap={3}>
      {props.renderDefault(props)}

      <Stack gap={2}>
        <Button
          mode="ghost"
          tone="primary"
          text={
            progress
              ? `Uploading ${progress.done} / ${progress.total}…`
              : "Upload multiple images"
          }
          disabled={Boolean(progress)}
          onClick={() => fileInput.current?.click()}
        />
        <Text size={1} muted>
          Select as many images as you like. They upload in batches and are added
          to the end of the list, so anything already here is kept. Drag to
          reorder afterwards.
        </Text>
      </Stack>

      <input
        ref={fileInput}
        type="file"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={(event) => handleFiles(event.currentTarget.files)}
      />
    </Stack>
  );
}
