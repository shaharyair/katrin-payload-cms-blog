import RichText from "@/components/RichText";
import React from "react";

import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { Width } from "../Width";

export const Message: React.FC<{ message: SerializedEditorState }> = ({
  message,
}) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} />}
    </Width>
  );
};
