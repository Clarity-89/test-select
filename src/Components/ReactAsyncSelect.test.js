import { act, render, screen, waitFor } from "@testing-library/react";
import { select } from "react-select-event";
import userEvent from "@testing-library/user-event";

import { ReactAsyncSelectForm } from "./ReactAsyncSelectForm";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("ReactAsyncSelectForm", () => {
  it("should render with default value selected", async () => {
    setup(
      <ReactAsyncSelectForm defaultValue={{ value: "cat", label: "Cat" }} />
    );
    expect(await screen.findByText("Cat")).toBeInTheDocument();
    expect(screen.queryByText("Dog")).not.toBeInTheDocument();
    expect(screen.getByLabelText("animal form")).toHaveFormValues({
      animals: "cat",
    });
  });

  it("should select correct value on change", async () => {
    const { user } = setup(
      <ReactAsyncSelectForm
        defaultValue={{ value: "cat", label: "Cat" }}
        inputId={"animals"}
      />
    );
    await waitFor(async () => {
      //expect(await screen.findByText("Cat")).toBeInTheDocument();
      await user.click(screen.getByLabelText("Animals"));
      await user.click(screen.getByText("Zebra"));
    });
    //expect(await screen.findByText("Cat")).toBeInTheDocument();
    //await act(async () => {
    // screen.getByLabelText("Animals").focus();
    // await user.keyboard("[ArrowDown]");
    //});
    // await act(async () => {
    //   await user.click(screen.getByText("Zebra"));
    // });

    expect(screen.getByLabelText("animal form")).toHaveFormValues({
      animals: "zebra",
    });
  });

  it("should work with select-event", async () => {
    const mockUpdate = jest.fn();
    setup(
      <ReactAsyncSelectForm
        defaultValue={{ value: "cat", label: "Cat" }}
        inputId={"animals"}
        onChange={mockUpdate}
      />
    );

    await waitFor(async () =>
      select(screen.getByLabelText("Animals"), "Zebra")
    );

    expect(screen.getByLabelText("animal form")).toHaveFormValues({
      animals: "zebra",
    });
  });

  it("should work with multi-select", async () => {
    setup(<ReactAsyncSelectForm inputId={"animals"} isMulti />);

    await waitFor(() =>
      select(screen.getByLabelText("Animals"), ["Zebra", "Lion"])
    );

    expect(screen.getByLabelText("animal form")).toHaveFormValues({
      animals: ["zebra", "lion"],
    });
  });
});
