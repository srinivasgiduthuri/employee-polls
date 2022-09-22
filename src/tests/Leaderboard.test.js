import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import Leaderboard from "../components/Leaderboard";
import { createMemoryHistory } from "@remix-run/router";

const store = createStore(reducer, middleware);

describe("Leaderboard", () => {
  it("matches the snapshot", () => {
    // Reference https://bobbyhadz.com/blog/react-cannot-read-property-pathname-of-undefined
    const history = createMemoryHistory();
    const view = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Leaderboard />
        </Router>
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });
});
