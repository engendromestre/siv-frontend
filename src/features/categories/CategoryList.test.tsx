import { delay, http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils"
import { baseUrl } from "../api/apiSlice"
import { CategoryList } from "./CategoryList"
import { categoryResponse, categoryResponse2 } from "./mocks/category"

export const handlers = [
  http.get(`${baseUrl}/categories`, async ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get("page")
    // const perPage = url.searchParams.get("per_page")
    // console.log(`Requested page: ${page}, per_page: ${perPage}`)

    if (page === "2") {
      await delay(150)
      return HttpResponse.json(categoryResponse2)
    }

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
      http.get(`${baseUrl}/categories`, async () => {
        return HttpResponse.error()
      }),
    )

    renderWithProviders(<CategoryList />)
    await waitFor(() => {
      const error = screen.getByText("Error fetching category!")
      expect(error).toBeInTheDocument()
    })
  })

  it("should handle On PageChange", async () => {
    renderWithProviders(<CategoryList />)

    await waitFor(() => {
      const name = screen.getByText("PaleTurquoise")
      expect(name).toBeInTheDocument()
    })

    const nextButton = screen.getByTitle("Go to next page")
    fireEvent.click(nextButton)

    await waitFor(() => {
      // Verifique se o item da segunda página está presente
      const name = screen.getByText("SeaGreen")
      expect(name).toBeInTheDocument()
    })
  })

  
})
