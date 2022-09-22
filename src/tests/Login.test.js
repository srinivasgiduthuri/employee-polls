import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import middleware from "../middleware";
import reducer from "../reducers";
import Login from "../components/Login";
import userEvent from "@testing-library/user-event";

const store = createStore(reducer, middleware);

describe("CreatePoll", () => {
  it("will enable the submit button when login", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const userInput = screen.getByTestId("user");
    userEvent.selectOptions(userInput, "None");
    const options = screen.getAllByTestId("user-option");
    expect(options[0].selected).toBeTruthy();
  });

  it("will disable the submit button when submitting a new question without both options", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const userInput = screen.getByTestId("user");
    const submitButton = screen.getByTestId("login");
    fireEvent.change(userInput, { target: { value: "mtsamis" } });

    expect(submitButton).toHaveProperty("disabled", true);
  });
});
