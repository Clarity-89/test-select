import { render, screen, waitFor } from "@testing-library/react";
import { select } from "react-select-event";
import userEvent from "@testing-library/user-event";

import { ReactAsyncSelectForm } from "./ReactAsyncSelectForm";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

const selectOptions = async (input, options) => {
  await waitFor(() => select(input, options));
};

describe("ReactAsyncSelectForm", () => {
  it("should render with default value selected", async () => {
    setup(
      <ReactAsyncSelectForm defaultValue={{ value: "cat", label: "Cat" }} />
    );
    expect(await screen.findByText("Cat")).toBeInTheDocument();
    expect(screen.queryByText("Dog")).not.toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveFormValues({ animals: "cat" });
  });

  it("should select correct value on change", async () => {
    const { user } = setup(
      <ReactAsyncSelectForm defaultValue={{ value: "cat", label: "Cat" }} />
    );
    await waitFor(async () => {
      //expect(await screen.findByText("Cat")).toBeInTheDocument();
      await user.click(screen.getByLabelText("Animals"));
      await user.click(screen.getByText("Zebra"));
    });

    expect(screen.getByRole("form")).toHaveFormValues({ animals: "zebra" });
  });

  it("should work with select-event", async () => {
    setup(
      <ReactAsyncSelectForm defaultValue={{ value: "cat", label: "Cat" }} />
    );

    await selectOptions(screen.getByLabelText("Animals"), "Zebra");

    expect(screen.getByRole("form")).toHaveFormValues({ animals: "zebra" });
  });

  it("should work with multi-select", async () => {
    setup(<ReactAsyncSelectForm inputId={"animals"} isMulti />);

    await selectOptions(screen.getByLabelText("Animals"), ["Zebra", "Lion"]);

    expect(screen.getByRole("form")).toHaveFormValues({
      animals: ["zebra", "lion"],
    });
  });
});
