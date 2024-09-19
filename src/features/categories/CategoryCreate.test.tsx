import { delay, http, HttpResponse } from "msw"
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils"
import { baseUrl } from "../api/apiSlice"
import { CategoryCreate } from "./CategoryCreate"
import { setupServer } from "msw/node"

export const handlers = [
  http.post(`${baseUrl}/categories`, async ({ request }) => {
    await delay(150)
    return HttpResponse.json({ status: 201 })
  }),
]

const server = setupServer(...handlers)

describe("CategoryCreate", () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it("should render corretly", () => {
    const { asFragment } = renderWithProviders(<CategoryCreate />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render submit", async () => {
    renderWithProviders(<CategoryCreate />)

    const name = screen.getByTestId("name")
    const description = screen.getByTestId("description")
    const isActive = screen.getByTestId("is_active")
    const submit = screen.getByRole("button", { name: /Save/i })

    fireEvent.change(name, { target: { value: "test" } })
    fireEvent.change(description, { target: { value: "test description" } })
    fireEvent.click(isActive)
    fireEvent.click(submit)

    await waitFor(() => {
      expect(
        screen.getByText("Category create successfully!"),
      ).toBeInTheDocument()
    })
  })

  it("should handle submit error", async () => {
    server.use(
      http.post(`${baseUrl}/categories`, async () => {
        return HttpResponse.error()
      }),
    )

    renderWithProviders(<CategoryCreate />)

    const name = screen.getByTestId("name")
    const description = screen.getByTestId("description")
    const isActive = screen.getByTestId("is_active")
    const submit = screen.getByRole("button", { name: /Save/i })

    fireEvent.change(name, { target: { value: "test" } })
    fireEvent.change(description, { target: { value: "test description" } })
    fireEvent.click(isActive)
    fireEvent.click(submit)

    await waitFor(() => {
      expect(screen.getByText("Failed to create category!")).toBeInTheDocument()
    })
  })
})
