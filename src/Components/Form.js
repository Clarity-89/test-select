import { useState } from "react";
import { Select } from "./Select";

export const Form = ({
  onSave = (value) => {
    console.log(value);
  },
}) => {
  const [selected, setSelected] = useState("dog");
  return (
    <div>
      <Select
        defaultValue={selected}
        onChange={setSelected}
        options={[
          { label: "Cat", value: "cat" },
          { label: "Dog", value: "dog" },
        ]}
      />
      <button onClick={onSave}>Save</button>
    </div>
  );
};
