import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

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

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("Native select wrapper", () => {
  it("should render with default value selected", () => {
    setup(<Select options={animals} defaultValue={"cat"} />);

    expect(screen.getByRole("combobox")).toHaveValue("cat");
    expect(screen.getByRole("option", { name: "Cat" }).selected).toBe(true);
  });

  it("should select correct value on change", async () => {
    const { user } = setup(<Select options={animals} defaultValue={"cat"} />);
    await user.selectOptions(screen.getByRole("combobox"), "zebra");

    expect(screen.getByRole("combobox")).toHaveValue("zebra");
    expect(screen.getByRole("option", { name: "Zebra" }).selected).toBe(true);
  });
});
