import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { CategoryTable } from "./CategoryTable"

const Props = {
  data: {
    data: [
      {
        id: "394d4556-d56e-4987-a192-77d72e48ed3a",
        name: "Category 2",
        description: "Description 2",
        is_active: true,
      },
    ],
    meta: {
      currentPage: 1,
      perPage: 10,
      lastPage: 1,
      total: 1,
    },
  },
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

describe("CategoryTable", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<CategoryTable {...Props} />, {
      wrapper: BrowserRouter,
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render CategoryTable with loading", () => {
    const { asFragment } = render(
      <CategoryTable {...Props} isFetching={true} />,
      {
        wrapper: BrowserRouter,
      },
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render CateboryTable with Inactive value", () => {
    const { asFragment } = render(
      <CategoryTable
        {...Props}
        data={{
          ...Props.data,
          data: [
            {
              ...Props.data.data[0],
              is_active: false,
            },
          ],
        }}
      />,
      {
        wrapper: BrowserRouter,
      },
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render CategoryTable with empty data ", () => {
    const { asFragment } = render(
      <CategoryTable {...Props} data={undefined} />,
      { wrapper: BrowserRouter },
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render CategoryTable with data", () => {
    const { asFragment } = render(
      <CategoryTable
        {...Props}
        data={{
          data: [{ ...Props.data.data[0] }],
          meta: { ...Props.data.meta },
        }}
      />,
      {
        wrapper: BrowserRouter,
      },
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
