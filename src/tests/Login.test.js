import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import middleware from "../middleware";
import reducer from "../reducers";
import Login from "../components/Login";

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
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByTestId("login");
    fireEvent.change(userInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(submitButton).toHaveProperty("disabled", false);
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
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByTestId("login");
    fireEvent.change(userInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    expect(submitButton).toHaveProperty("disabled", true);
  });
});
