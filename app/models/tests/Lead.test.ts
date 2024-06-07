import * as services from "app/services/api/api"
import { Lead } from "../RootStore"
import { MOCK_LEADS } from "./mock"

const data = MOCK_LEADS[0]

describe("Lead Model actions", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  let lead = Lead.create(data)

  test("BackGroundChecks call action ", async () => {
    const recordsCallSpy = jest
      .spyOn(services, "getBackGroundChecks")
      .mockReturnValue(Promise.resolve([{ check: true }, { check: false }]))
    lead.getBackgroundChecks()
    expect(lead).toHaveProperty("guid")
    expect(lead).toHaveProperty("recordsCheck")
    expect(lead).toHaveProperty("registryCheck")
    expect(recordsCallSpy).toHaveBeenCalled()
  })

  test("BackGroundChecks Rejection", async () => {
    lead = Lead.create(data);
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject(new Error()))
    lead.getBackgroundChecks()

    expect(lead.registryCheck).toBeUndefined()
    expect(lead.recordsCheck).toBeUndefined()
  })

  test("setBackGround Checks results action", async () => {
    lead.setBackgroundChecksResults(true, false)
    expect(lead.registryCheck).toBe(true)
    expect(lead.recordsCheck).toBe(false)
  })

  test("getScore  action and api call is triggered", async () => {
    const spy = jest.spyOn(services, "getScore")
    lead.getScore()
    expect(spy).toHaveBeenCalled()
    expect(lead.recordsCheck).toBe(false)
  })

  test("setScore action", async () => {
    lead.setScoreResults(10)
    expect(lead.score).toBe(10)
  })
})
