import Select from "react-select";

export const ReactSelectForm = (selectProps) => {
  const animals = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "lion", label: "Lion" },
    { value: "tiger", label: "Tiger" },
    { value: "elephant", label: "Elephant" },
    { value: "giraffe", label: "Giraffe" },
    { value: "zebra", label: "Zebra" },
    { value: "penguin", label: "Penguin" },
    { value: "panda", label: "Panda" },
    { value: "koala", label: "Koala" },
  ];
  return (
    <form aria-label={"animal form"}>
      <label htmlFor={"animals"}>Animals</label>
      <Select
        name={"animals"}
        inputId={"animals"}
        options={animals}
        {...selectProps}
      />
    </form>
  );
};
