import { renderWithProviders } from "../../utils/test-utils"
import { CastMembersCreate } from "./CastMembersCreate"


describe("CastMembersCreate", () => {
    it("should render corretly", () => {
        const { asFragment } = renderWithProviders(<CastMembersCreate />)
        expect(asFragment()).toMatchSnapshot()
    })
});