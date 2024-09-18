import { delay, http, HttpResponse } from "msw"
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils"
import { CastMembersCreate } from "./CastMembersCreate"
import { baseUrl } from "../api/apiSlice"
import { setupServer } from "msw/node"

export const handlers = [
  http.post(`${baseUrl}/cast-members`, () => {
    delay(150)
    return HttpResponse.json({ status: 201 })
  }),
]

const server = setupServer(...handlers)

describe("CastMembersCreate", () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  it("should render corretly", () => {
    const { asFragment } = renderWithProviders(<CastMembersCreate />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should handle submit", async () => {
    renderWithProviders(<CastMembersCreate />)
    const name = screen.getByTestId("name")
    const submit = screen.getByText("Save")

    fireEvent.change(name, { target: { value: "Test" } })
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText("Cast member created successfully!")
      expect(text).toBeInTheDocument()
    })
  })

  it("should handle submit error", async () => {
    server.use(
      http.post(`${baseUrl}/cast-members`, () => {
        return HttpResponse.error()
      }),
    )

    renderWithProviders(<CastMembersCreate />)
    const name = screen.getByTestId("name")
    const submit = screen.getByText("Save")

    fireEvent.change(name, { target: { value: "Test" } })
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText("Failed to create cast member!")
      expect(text).toBeInTheDocument()
    })
  })
})
