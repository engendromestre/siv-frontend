import { GenreTable } from "./GenreTable"
import { renderWithProviders } from "../../../utils/test-utils"
import { genreResponse } from "../../mocks/genres"

const Props = {
  data: undefined,
  isFetching: false,
  paginationModel: {
    page: 1,
    pageSize: 10,
  },
  pageSizeOptions: [10, 25, 50, 100],
  onPaginationModelChange: vi.fn(),
  handleFilterChange: vi.fn(),
  handleDelete: vi.fn(),
}

describe("GenreTable", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreTable {...Props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should handle loading state", () => {
    const { asFragment } = renderWithProviders(
      <GenreTable {...Props} isFetching={true} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("should handle Genres Table with data", () => {
    const data = genreResponse
    const { asFragment } = renderWithProviders(
      <GenreTable {...Props} data={data} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render Genre table with Delete button", () => {
    const data = genreResponse
    const { asFragment } = renderWithProviders(
      <GenreTable {...Props} data={data} handleDelete={vi.fn()} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
