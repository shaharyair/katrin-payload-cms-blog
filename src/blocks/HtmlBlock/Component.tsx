import React from "react";

export type Props = {
  html: string;
};

export const HtmlBlock: React.FC<Props> = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
);
