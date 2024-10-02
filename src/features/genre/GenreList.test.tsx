import { delay, http, HttpResponse } from "msw"
import { baseUrl } from "../api/apiSlice"
import { categoryResponse } from "../mocks/category"
import { genreResponse, genreResponse2 } from "../mocks/genres"
import { setupServer } from "msw/node"
import {
  screen,
  renderWithProviders,
  waitFor,
  fireEvent,
} from "../../utils/test-utils"
import { GenreList } from "./GenreList"

const handlers = [
  http.get(`${baseUrl}/genres`, async ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get("page")

    if (page === "2") {
      await delay(150)
      return HttpResponse.json(genreResponse2)
    }

    await delay(150)
    return HttpResponse.json(genreResponse)
  }),
  http.get(`${baseUrl}/categories`, async () => {
    await delay(150)
    return HttpResponse.json(categoryResponse)
  }),
  http.delete(`${baseUrl}/genres/:id`, async () => {
    await delay(150)
    return HttpResponse.json({ status: 204 })
  }),
]

const server = setupServer(...handlers)

describe("GenreList", () => {
  beforeEach(() => server.resetHandlers())
  afterAll(() => server.close())
  beforeAll(() => server.listen())

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreList />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render loading state", () => {
    renderWithProviders(<GenreList />)
    const loading = screen.getByRole("progressbar")
    expect(loading).toBeInTheDocument()
  })

  it("should render success state", async () => {
    renderWithProviders(<GenreList />)
    await waitFor(() => {
      const name = screen.getByText(genreResponse.data[0].name)
      expect(name).toBeInTheDocument()
    })
  })

  it("should render error state", async () => {
    server.use(
      http.get(`${baseUrl}/genres`, async () => {
        return HttpResponse.error()
      }),
    )
    renderWithProviders(<GenreList />)
    await waitFor(() => {
      const error = screen.getByText("Error fetching genres!")
      expect(error).toBeInTheDocument()
    })
  })

  it("should handle On PageChange", async () => {
    renderWithProviders(<GenreList />)

    await waitFor(() => {
      const name = screen.getByText(genreResponse.data[0].name)
      expect(name).toBeInTheDocument()
    })

    const nextButton = screen.getByTitle("Go to next page")
    fireEvent.click(nextButton)

    await waitFor(() => {
      const name = screen.getByText(genreResponse2.data[0].name)
      expect(name).toBeInTheDocument()
    })
  })

  it("should handle On FilterChange", async () => {
    renderWithProviders(<GenreList />)

    await waitFor(() => {
      const name = screen.getByText(genreResponse.data[0].name)
      expect(name).toBeInTheDocument()
    })

    const filterInput = screen.getByPlaceholderText("Search…")
    fireEvent.change(filterInput, { target: { value: "Genre 1" } })

    await waitFor(() => {
      const loading = screen.getByRole("progressbar")
      expect(loading).toBeInTheDocument()
    })
  })

  it("should clear filter when no filter values are provided", async () => {
    renderWithProviders(<GenreList />)

    await waitFor(() => {
      const name = screen.getByText(genreResponse.data[0].name)
      expect(name).toBeInTheDocument()
    })

    const filterInput = screen.getByPlaceholderText("Search…")
    fireEvent.change(filterInput, { target: { value: "Genre 1" } })

    await waitFor(() => {
      const loading = screen.getByRole("progressbar")
      expect(loading).toBeInTheDocument()
    })

    fireEvent.change(filterInput, { target: { value: "" } })

    await waitFor(() => {
      expect(screen.getByText(genreResponse.data[0].name)).toBeInTheDocument()
      expect(screen.getByText(genreResponse.data[1].name)).toBeInTheDocument()
    })
  })

  it("should handle Delete Genre success", async () => {
    renderWithProviders(<GenreList />)

    await waitFor(() => {
      const name = screen.getByText(genreResponse.data[0].name)
      expect(name).toBeInTheDocument()
    })

    const deleteButton = screen.getAllByTestId("DeleteIcon")[0]
    fireEvent.click(deleteButton)

    await waitFor(() => {
      const name = screen.getByText("Genre deleted successfully!")
      expect(name).toBeInTheDocument()
    })
  })
})
