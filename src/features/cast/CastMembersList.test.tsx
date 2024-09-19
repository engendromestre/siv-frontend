import { delay, http, HttpResponse } from "msw"
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils"
import { CastMembersList } from "./CastMembersList"
import { baseUrl } from "../api/apiSlice"
import { castMemberResponse, castMemberResponse2 } from "../mocks/castMembers"
import { setupServer } from "msw/node"

const handlers = [
  http.get(`${baseUrl}/cast-members`, async ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get("page")

    if (page === "2") {
      await delay(150)
      return HttpResponse.json(castMemberResponse2)
    }

    await delay(150)
    return HttpResponse.json(castMemberResponse)
  }),
  http.delete(`${baseUrl}/cast-members/:id`, async () => {
    await delay(150)
    return HttpResponse.json({ status: 204 })
  }),
]

const server = setupServer(...handlers)

describe("CastMembersList", () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CastMembersList />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render loading state", () => {
    renderWithProviders(<CastMembersList />)

    const loading = screen.getByRole("progressbar")

    expect(loading).toBeInTheDocument()
  })

  it("should render success state", async () => {
    renderWithProviders(<CastMembersList />)
    //esperar que o elemento seja renderizado
    await waitFor(() => {
      const name = screen.getByText(castMemberResponse.data[0].name)
      expect(name).toBeInTheDocument()
    })
  })

  it("should render error state", async () => {
    server.use(
      http.get(`${baseUrl}/cast-members`, async () => {
        return HttpResponse.error()
      }),
    )

    renderWithProviders(<CastMembersList />)
    await waitFor(() => {
      const error = screen.getByText("Cast Member not deleted")
      expect(error).toBeInTheDocument()
    })
  })

  it("should handle On PageChange", async () => {
    renderWithProviders(<CastMembersList />)

    await waitFor(() => {
      const name = screen.getByText("John Doe")
      expect(name).toBeInTheDocument()
    })

    const nextButton = screen.getByTitle("Go to next page")
    fireEvent.click(nextButton)

    await waitFor(() => {
      // Verifique se o item da segunda página está presente
      const name = screen.getByText("Tom Hanks")
      expect(name).toBeInTheDocument()
    })
  })

  it("should handle On FilterChange", async () => {
    renderWithProviders(<CastMembersList />)

    await waitFor(() => {
      const name = screen.getByText("John Doe")
      expect(name).toBeInTheDocument()
    })

    const filterInput = screen.getByPlaceholderText("Search…")
    fireEvent.change(filterInput, { target: { value: "John Doe 2" } })

    await waitFor(() => {
      const loading = screen.getByRole("progressbar")
      expect(loading).toBeInTheDocument()
    })
  })

  it("should clear filter when no filter values are provided", async () => {
    // Renderiza o componente
    renderWithProviders(<CastMembersList />)

    // Espera que os dados sejam carregados inicialmente
    await waitFor(() => {
      const name = screen.getByText("John Doe")
      expect(name).toBeInTheDocument()
    })

    // Simula a mudança de filtro para algo
    const filterInput = screen.getByPlaceholderText("Search…")
    fireEvent.change(filterInput, { target: { value: "Tom Hanks" } })

    // Espera pelo carregamento enquanto o filtro está ativo
    await waitFor(() => {
      const loading = screen.getByRole("progressbar")
      expect(loading).toBeInTheDocument()
    })

    // Simula a limpeza do filtro
    fireEvent.change(filterInput, { target: { value: "" } })

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument()
      expect(screen.getByText("Jane Smith")).toBeInTheDocument()
    })
  })

  it("should handle Delete Category success", async () => {
    renderWithProviders(<CastMembersList />)

    await waitFor(() => {
      const name = screen.getByText("John Doe")
      expect(name).toBeInTheDocument()
    })

    const deleteButton = screen.getAllByTestId("DeleteIcon")[0]
    fireEvent.click(deleteButton)

    await waitFor(() => {
      const name = screen.getByText("Cast Member deleted")
      expect(name).toBeInTheDocument()
    })
  })
})
