import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import middleware from "../middleware";
import reducer from "../reducers";
import CreatePoll from "../components/CreatePoll";

const store = createStore(reducer, middleware);

describe("CreatePoll", () => {
  it("will enable the submit button when submitting a new question with both options", async () => {
    render(
      <Provider store={store}>
        <Router>
          <CreatePoll />
        </Router>
      </Provider>
    );

    const optionOneInput = screen.getByTestId("optionOne");
    const optionTwoInput = screen.getByTestId("optionTwo");
    const submitButton = screen.getByTestId("createPoll");
    fireEvent.change(optionOneInput, { target: { value: "option one test" } });
    fireEvent.change(optionTwoInput, { target: { value: "option two test" } });

    expect(submitButton).toHaveProperty("disabled", false);
  });

  it("will disable the submit button when submitting a new question without both options", () => {
    render(
      <Provider store={store}>
        <Router>
          <CreatePoll />
        </Router>
      </Provider>
    );

    const optionOneInput = screen.getByTestId("optionOne");
    const optionTwoInput = screen.getByTestId("optionTwo");
    const submitButton = screen.getByTestId("createPoll");
    fireEvent.change(optionOneInput, { target: { value: "option one test" } });
    fireEvent.change(optionTwoInput, { target: { value: "" } });

    expect(submitButton).toHaveProperty("disabled", true);
  });
});
