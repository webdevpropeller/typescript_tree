import "@testing-library/jest-dom/extend-expect";
import { RenderResult, waitFor } from "@testing-library/react";
import { getReactComponent, getTestContext } from "../../../../utils/tests";
import { CounterPage } from "../CounterPage";

const { context } = getTestContext();

function getComponent({ name = "Some Name" } = {}): RenderResult {
    return getReactComponent(<CounterPage name={name} />, context);
}

describe("CounterPage component", () => {
    test("renders a greeting", async () => {
        const component = getComponent();
        await waitFor(() => expect(component.queryByText("Hello Some Name!")).toBeInTheDocument());
    });
});
