import { delay, http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { renderWithProviders, screen, waitFor } from "../../utils/test-utils"
import { baseUrl } from "../api/apiSlice"
import { CategoryList } from "./CategoryList"
import { categoryResponse } from "./mocks"

export const handlers = [
  http.get(`${baseUrl}/categories`, async () => {
    await delay(150)
    return HttpResponse.json(categoryResponse)
  }),
]

const server = setupServer(...handlers)

describe("CategoryList", () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryList />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render loading state", () => {
    renderWithProviders(<CategoryList />)

    const loading = screen.getByRole("progressbar")

    expect(loading).toBeInTheDocument()
  })

  it("should render success state", async () => {
    renderWithProviders(<CategoryList />)
    //esperar que o elemento seja renderizado
    await waitFor(() => {
      const name = screen.getByText(categoryResponse.data[0].name)
      expect(name).toBeInTheDocument()
    })
  })

  it("should render error state", async () => {
    server.use(
      http.get(`${baseUrl}/categories`, () => {
        return HttpResponse.error()
      }),
    )

    renderWithProviders(<CategoryList />)
    await waitFor(() => {
      const error = screen.getByText("Error fetching category!")
      expect(error).toBeInTheDocument()
    })
  })
})
