import { act, render, screen, waitFor } from "@testing-library/react";
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
    expect(screen.queryByText("Dog")).not.toBeInTheDocument();
    expect(screen.getByLabelText("animal form")).toHaveFormValues({
      animals: "cat",
    });
  });

  it("should select correct value on change", async () => {
    const { user } = setup(
      <ReactSelectForm
        defaultValue={{ value: "cat", label: "Cat" }}
        inputId={"animals"}
      />
    );

    await act(async () => {
      await user.click(screen.getByLabelText("Animals"));
      // screen.getByLabelText("Animals").focus();
      // await user.keyboard("[ArrowDown]");
    });
    await act(async () => {
      await user.click(screen.getByText("Zebra"));
    });

    expect(screen.getByLabelText("animal form")).toHaveFormValues({
      animals: "zebra",
    });
  });

  it("should work with select-event", async () => {
    const mockUpdate = jest.fn();
    setup(
      <ReactSelectForm
        defaultValue={{ value: "cat", label: "Cat" }}
        inputId={"animals"}
        onChange={mockUpdate}
      />
    );

    await waitFor(() => select(screen.getByLabelText("Animals"), "Zebra"));

    expect(screen.getByLabelText("animal form")).toHaveFormValues({
      animals: "zebra",
    });
  });

  it("should work with multi-select", async () => {
    setup(<ReactSelectForm inputId={"animals"} isMulti />);

    await waitFor(() =>
      select(screen.getByLabelText("Animals"), ["Zebra", "Lion"])
    );

    expect(screen.getByLabelText("animal form")).toHaveFormValues({
      animals: ["zebra", "lion"],
    });
  });
});
