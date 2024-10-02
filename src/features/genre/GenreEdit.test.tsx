import { delay, http, HttpResponse } from "msw"
import { baseUrl } from "../api/apiSlice"
import { genreResponse } from "../mocks/genres"
import { categoryResponse } from "../mocks/category"
import {
  screen,
  renderWithProviders,
  waitFor,
  fireEvent,
} from "../../utils/test-utils"
import { GenreEdit } from "./GenreEdit"
import { setupServer } from "msw/node"

const handlers = [
  http.get(`${baseUrl}/genres/undefined`, () => {
    const data = genreResponse.data[0]
    delay(150)
    return HttpResponse.json({ data })
  }),

  http.get(`${baseUrl}/categories`, () => {
    delay(150)
    return HttpResponse.json({ categoryResponse })
  }),

  http.patch(`${baseUrl}/genres/454edfc3-6cb1-4ad8-ae44-3ab94f9d369c`, async () => {
    await delay(150)
    return HttpResponse.json({ status: 200 })
  }),
]

const server = setupServer(...handlers)

describe("Genre Edit", () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreEdit />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should handle submit", async () => {
    renderWithProviders(<GenreEdit />)

    const name = screen.getByTestId("name")

    await waitFor(() => {
      expect(name).toHaveValue("Genre 1")
    })

    const submit = screen.getByText("Save")

    await waitFor(() => {
      expect(submit).toBeInTheDocument()
    })

    fireEvent.change(name, { target: { value: "Test" } })
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText("Genre updated successfully!")
      expect(text).toBeInTheDocument()
    })
  })

  it("should handle submit error", async () => {
    server.use(
      http.patch(`${baseUrl}/genres/454edfc3-6cb1-4ad8-ae44-3ab94f9d369c`, async () => {
        return HttpResponse.error()
      }),
    )

    renderWithProviders(<GenreEdit />)
    const name = screen.getByTestId("name")
    await waitFor(() => {
      expect(name).toHaveValue("Genre 1")
    })

    await waitFor(() => {
      const submit = screen.getByText("Save")
      expect(submit).toBeInTheDocument()
    })

    const submit = screen.getByText("Save")
    fireEvent.change(name, { target: { value: "test 1" } })
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText("Failed to update genre!")
      expect(text).toBeInTheDocument()
    })
  })
})
