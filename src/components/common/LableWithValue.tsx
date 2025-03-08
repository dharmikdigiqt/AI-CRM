
import clsx from "clsx";
import * as React from "react";

interface LabelWithValueProps extends React.HTMLAttributes<HTMLDivElement> {
    label: React.ReactNode;
    value: React.ReactNode;
    reverse?: boolean;
    classNames?: {
        root?: string;
        label?: string;
        value?: string;
    };
}

const LabelWithValue = (props: LabelWithValueProps) => {
    const { label, value, reverse, className, classNames, ...rest } = props;

    return (
        <div
            className={clsx(
                "flex flex-1 ",
                reverse ? "flex-col-reverse" : "flex-col",
                className,
                classNames?.root
            )}
            {...rest}
        >
            <h4 className={clsx("text-gray-6 font-medium", classNames?.label)}>
                {label}
            </h4>
            <h2 className={clsx("font-bold text-[#5D596C]", classNames?.value)}>
                {value || "-"}
            </h2>
        </div>
    );
};

export default LabelWithValue;
