import Select from "react-select/async";

export const ReactAsyncSelectForm = (selectProps) => {
  const loadOptions = () => {
    return new Promise((resolve) => {
      resolve([
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
      ]);
    });
  };

  return (
    <form aria-label={"animal form"}>
      <label htmlFor={"animals"}>Animals</label>
      <Select
        name={"animals"}
        inputId={"animals"}
        loadOptions={loadOptions}
        defaultOptions
        {...selectProps}
      />
    </form>
  );
};
