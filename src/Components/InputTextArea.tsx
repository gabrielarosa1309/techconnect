import { useRef } from "react";
import useAutosizeTextArea from "./useAutosizeTextArea.tsx";
import React from "react";

export default function InputText({
  id,
  type,
  setValue,
  textValue,
  onChange,
  placeholder,
  styles,
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, textValue);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(evt);

    const val = evt.target?.value;

    setValue(val);
    

  };

  return (
    <div className={`flex flex-col w-full h-max items-end gap-2 ${styles}`}>
      <div className="border-complementary-white h-max border rounded-[12px] w-full flex justify-center flex-col items-end">
        <textarea
          id={id}
          maxLength={500}
          onChange={handleChange}
          placeholder={placeholder}
          ref={textAreaRef}
          rows={1}
          value={textValue}
          required
          className="resize-none px-[30px] py-6 w-full outline-none text-complementary-white bg-transparent caret-white placeholder-complementary-white"
        />
        <p
          className={`text-[13px] font-normal text-center text-complementary-white pr-4 pb-4`}
        >
          {textValue.length}/500
        </p>
      </div>

    </div>
  );
}
