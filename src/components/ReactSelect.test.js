import { render, screen, waitFor } from "@testing-library/react";
import { select } from "react-select-event";
import userEvent from "@testing-library/user-event";

import { ReactSelectForm } from "./ReactSelectForm";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("ReactSelectForm", () => {
  it("should render with default value selected", () => {
    setup(<ReactSelectForm defaultValue={{ value: "cat", label: "Cat" }} />);
    expect(screen.getByText("Cat")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveFormValues({ animals: "cat" });
  });

  it("should select correct value on change", async () => {
    const { user } = setup(
      <ReactSelectForm defaultValue={{ value: "cat", label: "Cat" }} />
    );

    await waitFor(async () => {
      // await user.click(screen.getByLabelText("Animals"));
      screen.getByLabelText("Animals").focus();
      await user.keyboard("[ArrowDown]");
      await user.click(screen.getByText("Zebra"));
    });

    expect(screen.getByRole("form")).toHaveFormValues({ animals: "zebra" });
  });

  it("should work with select-event", async () => {
    setup(<ReactSelectForm defaultValue={{ value: "cat", label: "Cat" }} />);

    await selectOptions(screen.getByLabelText("Animals"), "Zebra");

    expect(screen.getByRole("form")).toHaveFormValues({ animals: "zebra" });
  });

  it("should work with multi-select", async () => {
    setup(<ReactSelectForm isMulti />);

    await selectOptions(screen.getByLabelText("Animals"), ["Zebra", "Lion"]);

    expect(screen.getByRole("form")).toHaveFormValues({
      animals: ["zebra", "lion"],
    });
  });
});

const selectOptions = async (input, options) => {
  await waitFor(() => select(input, options));
};
