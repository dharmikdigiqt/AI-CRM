import { cardVariants } from "../../styles/shared";
import React, { forwardRef } from "react";
import { VariantProps } from "tailwind-variants";

interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const { className, ...rest } = props;
    return <div ref={ref} className={cardVariants({ className })} {...rest} />;
});

Card.displayName = "Card";
