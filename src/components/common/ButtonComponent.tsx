import { getFontCls } from "@/app/fonts";
import clsx from "clsx";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";


type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const ButtonComponent: FC<IProps> = ({ children, className, leftIcon, rightIcon, ...otherProps }) => {

    return (
        <button className={clsx('group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black', className)} {...otherProps}>
            {leftIcon ? leftIcon : <></>}
            <span className={clsx(getFontCls('general'), "relative incline-flex overflow-hidden text-xs uppercase")}>
                <div>{children}</div>
            </span>
            {rightIcon ? rightIcon : <></>}
        </button>
    )
}

export default ButtonComponent