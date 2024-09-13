import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { CastMembersTable } from "./CastMembersTable"

const Props = {
  data: {
    data: [
      {
        id: "8cc19b8a-b3c5-4944-842d-6fcf01f78667",
        name: "Cast Member 2",
        type: 2,
        created_at: "2024-09-12T15:42:58.465Z",
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

describe("CastMembersTable", () => {
  it("should render cast members table correctly", () => {
    const { asFragment } = render(<CastMembersTable {...Props} />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it("should render loading spinner when fetching", () => {
    const { getByRole } = render(<CastMembersTable {...Props} isFetching />, {
      wrapper: BrowserRouter,
    })
    const loadingSpinner = getByRole("progressbar")
    expect(loadingSpinner).toBeInTheDocument()
  })

  it("should render CastMembersTable with empty data", () => {
    const { asFragment } = render(
      <CastMembersTable {...Props} data={undefined} />,
      { wrapper: BrowserRouter },
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render CastMembersTable with data", () => {
    const { asFragment } = render(
      <CastMembersTable
        {...Props}
        data={{
          data: [{ ...Props.data.data[0], type: 2 }],
          meta: { ...Props.data.meta },
        }}
      />,
      {
        wrapper: BrowserRouter,
      },
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render CastMembersTable with Diretor (1) value", () => {
    const { asFragment } = render(
      <CastMembersTable
        {...Props}
        data={{
          data: [{ ...Props.data.data[0], type: 1 }],
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
