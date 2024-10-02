import { delay, http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils"
import { baseUrl } from "../api/apiSlice"
import { categoryResponse } from "../mocks/category"
import { GenreCreate } from "./GenreCreate"

const handlers = [
  http.get(`${baseUrl}/categories`, async () => {
    await delay(150)
    return HttpResponse.json(categoryResponse)
  }),
  http.post(`${baseUrl}/genres`, async () => {
    await delay(150)
    return HttpResponse.json({ status: 201 })
  }),
]

const server = setupServer(...handlers)

describe("Genre Create", () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
  afterEach(() => server.resetHandlers())

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreCreate />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should handle submit", async () => {
    renderWithProviders(<GenreCreate />)
    const name = screen.getByTestId("name")
    const save = screen.getByText("Save")

    await waitFor(() => {
      expect(save).toBeInTheDocument()
    })

    fireEvent.change(name, { target: { value: "test" } })

    fireEvent.click(save)

    await waitFor(() => {
        const text = screen.getByText("Genre create successfully!")
        expect(text).toBeInTheDocument()
    })
  })

  it("should handle error", async () => {
    server.use(
        http.post(`${baseUrl}/genres`, async () => {
          return HttpResponse.error()
        }),
    )

    renderWithProviders(<GenreCreate />)
    const name = screen.getByTestId("name")
    const save = screen.getByText("Save")

    await waitFor(() => {
      expect(save).toBeInTheDocument()
    })

    fireEvent.change(name, { target: { value: "test" } })

    fireEvent.click(save)

    await waitFor(() => {
        const text = screen.getByText("Failed to create genre!")
        expect(text).toBeInTheDocument()
    })
  })
})
