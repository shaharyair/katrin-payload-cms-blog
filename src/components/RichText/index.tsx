import { MediaBlock } from "@/blocks/MediaBlock/Component";
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from "@payloadcms/richtext-lexical/react";

import { CodeBlock, CodeBlockProps } from "@/blocks/Code/Component";

import { BannerBlock } from "@/blocks/Banner/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  HtmlBlock as HtmlBlockProps,
  MediaBlock as MediaBlockProps,
} from "@/payload-types";
import { cn } from "@/utilities/ui";
import { HtmlBlock } from "../../blocks/HtmlBlock/Component";

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | HtmlBlockProps
    >;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = value.slug;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => (
      <BannerBlock className="col-start-2 mb-4" {...node.fields} />
    ),
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-span-3 col-start-1"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    htmlBlock: ({ node }) => <HtmlBlock {...node.fields} />,
  },
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "prose mx-auto md:prose-md dark:prose-invert": enableProse,
        },
        className,
      )}
      {...rest}
    />
  );
}
