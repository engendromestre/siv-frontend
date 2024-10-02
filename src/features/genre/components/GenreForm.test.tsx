import { renderWithProviders } from "../../../utils/test-utils"
import { genreResponse } from "../../mocks/genres"
import { GenreForm } from "./GenreForm"

const Props = {
  genre: {
    id: "454edfc3-6cb1-4ad8-ae44-3ab94f9d369c",
    name: "Genre 1",
    categories_id: [
      "a679aa25-08c5-4017-96ed-cfe2f3ebdf9a",
      "b8a31219-f23c-43d6-8f4f-552c6a0f15e5",
    ],
    categories: [
      {
        id: "a679aa25-08c5-4017-96ed-cfe2f3ebdf9a",
        name: "Test",
        description: null,
        is_active: true,
      },
      {
        id: "b8a31219-f23c-43d6-8f4f-552c6a0f15e5",
        name: "SeaGreen",
        description: null,
        is_active: true,
      },
    ],
    is_active: true,
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: vi.fn(),
  handleChange: vi.fn(),
}

describe("Genre Form", () => {
  it("shoud render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreForm {...Props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("shoud render correctly with loading", () => {
    const { asFragment } = renderWithProviders(
      <GenreForm {...Props} isLoading={true} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("shoud render correctly with data", () => {
    const mockData = genreResponse
    const { asFragment } = renderWithProviders(
      <GenreForm {...Props} genre={mockData.data[0]} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
