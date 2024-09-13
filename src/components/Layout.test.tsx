import { render } from "@testing-library/react"
import { Layout } from "./Layout"

describe("Layout", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <Layout>
        <div>Content</div>
      </Layout>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
