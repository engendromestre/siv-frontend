import { delay, http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils"
import { baseUrl } from "../api/apiSlice"
import { CategoryEdit } from "./CategoryEdit"

const data = {
  id: "1",
  name: "Category 1",
  description: "Description 1",
  is_active: false,
}

export const handlers = [
  http.get(`${baseUrl}/categories`, () => {
    delay(150)
    return HttpResponse.json({ data })
  }),
  http.patch(`${baseUrl}/categories/1`, async () => {
    await delay(150)
    return HttpResponse.json({ status: 200 })
  }),
]
const server = setupServer(...handlers)

describe("Category Edit", () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
  afterEach(() => server.resetHandlers())

  it("should render corretly", () => {
    const { asFragment } = renderWithProviders(<CategoryEdit />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render submit", async () => {
    renderWithProviders(<CategoryEdit />)

    const name = await screen.findByTestId("name")
    const description = await screen.findByTestId("description")
    const isActive = screen.getByTestId("is_active")

    await waitFor(() => {
      expect(name).toHaveValue("Category 1")
      expect(description).toHaveValue("Description 1")
      expect(isActive).toHaveAttribute("data-checked", "false")
    })

    const submit = screen.getByRole("button", { name: /Save/i })

    fireEvent.change(name, { target: { value: "Category 2" } })
    fireEvent.change(description, { target: { value: "Description 2" } })
    fireEvent.click(isActive)

    fireEvent.click(submit)

    await waitFor(() => {
      expect(
        screen.getByText("Category updated successfully!"),
      ).toBeInTheDocument()
    })
  })

  it("should handle submit error", async () => {
    server.use(
      http.patch(`${baseUrl}/categories/1`, async () => {
        return HttpResponse.error()
      }),
    )

    renderWithProviders(<CategoryEdit />)

    const name = await screen.findByTestId("name")
    const description = await screen.findByTestId("description")
    const isActive = screen.getByTestId("is_active")

    await waitFor(() => {
      expect(name).toHaveValue("Category 1")
      expect(description).toHaveValue("Description 1")
      expect(isActive).toHaveAttribute("data-checked", "false")
    })

    fireEvent.change(name, { target: { value: "Category 2" } })
    fireEvent.change(description, { target: { value: "Description 2" } })
    fireEvent.click(isActive)

    const submit = screen.getByRole("button", { name: /Save/i })
    fireEvent.click(submit)

    await waitFor(() => {
      expect(screen.getByText("Error updating category!")).toBeInTheDocument()
    })
  })
})
