import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { CategoryForm } from "./CategoryForm"

const Props = {
  category: {
    id: "394d4556-d56e-4987-a192-77d72e48ed3a",
    name: "Category 2",
    description: "Description 2",
    is_active: true,
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: vi.fn(),
  handleChange: vi.fn(),
  handleToggle: vi.fn(),
}

describe("CategoryForm", () => {
  it("should render CategoryForm correctly", () => {
    const { asFragment } = render(<CategoryForm {...Props} />, {
      wrapper: BrowserRouter, // esse elemento está dentro de uma rota, então há necessidade de um provider
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render CategoryForm with loading", () => {
    const { asFragment } = render(
      <CategoryForm {...Props} isLoading={true} />,
      { wrapper: BrowserRouter },
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render CategoryForm with disabled", () => {
    const { asFragment } = render(
      <CategoryForm {...Props} isDisabled={true} />,
      { wrapper: BrowserRouter },
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
