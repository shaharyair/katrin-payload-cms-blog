import clsx from "clsx";
import Image from "next/image";

interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
  } = props;

  const loading = loadingFromProps || "lazy";
  const priority = priorityFromProps || "low";

  return (
    <Image
      alt="Payload Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx("w-[90px] object-contain dark:invert", className)}
      src="/logo.webp"
    />
    // <h1 className={clsx(className, "prose text-xl dark:prose-invert")}>
    //   KATRIN
    // </h1>
  );
};
