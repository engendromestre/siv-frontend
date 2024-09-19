import { delay, http, HttpResponse } from "msw"
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils"
import { baseUrl } from "../api/apiSlice"
import { CastMembersEdit } from "./CastMembersEdit"
import { setupServer } from "msw/node"

const data = {
  id: "1",
  name: "Cast Member 1",
  type: 1,
}

export const handlers = [
  http.get(`${baseUrl}/cast-members`, () => {
    delay(150)
    return HttpResponse.json({ data })
  }),
  http.patch(`${baseUrl}/cast-members/1`, async () => {
    await delay(150)
    return HttpResponse.json({ status: 200 })
  }),
]

const server = setupServer(...handlers)

describe("CastMembers Edit", () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
  afterEach(() => server.resetHandlers())

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CastMembersEdit />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should handle submit", async () => {
    renderWithProviders(<CastMembersEdit />)
    const name = screen.getByTestId("name")

    await waitFor(() => {
      expect(name).toHaveValue("Cast Member 1")
    })

    await waitFor(() => {
      const submit = screen.getByText("Save")
      expect(submit).toBeInTheDocument()
    })

    const submit = screen.getByText("Save")
    fireEvent.change(name, { target: { value: "Test" } })
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText("Cast member update successfully!")
      expect(text).toBeInTheDocument()
    })
  })

  it("should handle submit error", async () => {
    server.use(
      http.patch(`${baseUrl}/cast-members/1`, async () => {
        return HttpResponse.error()
      }),
    )

    renderWithProviders(<CastMembersEdit />)
    const name = screen.getByTestId("name")
    await waitFor(() => {
      expect(name).toHaveValue("Cast Member 1")
    })

    await waitFor(() => {
      const submit = screen.getByText("Save")
      expect(submit).toBeInTheDocument()
    })

    const submit = screen.getByText("Save")
    fireEvent.change(name, { target: { value: "test1" } })
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText("Failed to update cast member!")
      expect(text).toBeInTheDocument()
    })
  })
})
