import clsx from "clsx";
import * as React from "react";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <h2
      ref={ref}
      className={clsx(
        "text-gray-10 font-bold text-base lg:text-lg border border-b-[#e5e7eb] border-x-0 border-t-0 pb-4",
        className
      )}
      {...rest}
    />
  );
});

CardTitle.displayName = "CardTitle";
