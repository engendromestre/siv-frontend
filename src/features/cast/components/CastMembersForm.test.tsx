import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import { CastMembersForm } from "./CastMembersForm"

// mock
const Props = {
  castMember: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "test",
    type: 1,
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: vi.fn(),
  handleChange: vi.fn(),
}

describe("CastMembersForm", () => {
  it("should render castMember Form correctly", () => {
    const { asFragment } = render(<CastMembersForm {...Props} />, {
      wrapper: BrowserRouter, // esse elemento está dentro de uma rota, então há necessidade de um provider
    })

    // verificar se a árvore gerada será igual a esperada
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render castMember form with loading state", () => {
    const { asFragment } = render(
      <CastMembersForm {...Props} isLoading={true} />,
      { wrapper: BrowserRouter }
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it("should render castMember form with disabled state", () => {
    const { asFragment } = render(
      <CastMembersForm {...Props} isDisabled={true} />,
      { wrapper: BrowserRouter }
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
