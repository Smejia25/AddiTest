import * as services from "app/services/api/api"
import { LeadsStoreModel } from "../RootStore"
import { MOCK_LEADS } from "./mock"

const data = MOCK_LEADS;

describe("Leads Store", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  
  test("Store Created and call initial endpoint", async () => {
    const spy = jest.spyOn(services, "getLeads")
    LeadsStoreModel.create()
    expect(spy).toHaveBeenCalled()
  })

  test("SetLeads action", async () => {
    const leadsStore = LeadsStoreModel.create()
    leadsStore.setLeads(data)
    expect(leadsStore.leads).toHaveLength(5)
  })

  test("Promote a lead into a prospect action", async () => {
    const leadsStore = LeadsStoreModel.create({ leads: data })
    const prospect = leadsStore.leads[0]

    expect(leadsStore.leads).toHaveLength(5)
    leadsStore.promote(prospect)
    expect(leadsStore.leads).toHaveLength(4)
    expect(leadsStore.Prospects).toHaveLength(1)
  })
})
