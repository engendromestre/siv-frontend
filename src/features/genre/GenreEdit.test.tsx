import { delay, http, HttpResponse } from "msw"
import { baseUrl } from "../api/apiSlice"
import { genreResponse } from "../mocks/genres"
import { categoryResponse } from "../mocks/category"
import { screen, renderWithProviders, waitFor } from "../../utils/test-utils"
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
  http.patch(`${baseUrl}/genres/1`, async () => {
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

    
  })
})
