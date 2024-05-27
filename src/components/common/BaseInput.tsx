import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fieldName: string;
  className?: string;
  containerClassName?: string;
  type?: HTMLInputTypeAttribute;
}

export const BaseInput = ({
  value,
  onChange,
  fieldName,
  className,
  containerClassName,
  type,
  onBlur,
}: InputProps) => {
  return (
    <div className={"flex flex-col w-full " + containerClassName}>
      <p className="my-0 text-sm">{fieldName}</p>
      <input
        className={
          "h-9 border border-gray-300 w-60 my-0 rounded p-2 text-sm " +
          className
        }
        value={value}
        onChange={onChange}
        type={type}
        onBlur={onBlur}
      />
    </div>
  );
};
