import * as services from "app/services/api/api"

describe("Api requests", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test("getLeads ", async () => {
    const spy = jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ data: 100 }) })) as jest.Mock,
      )
    await services.getLeads()

    expect(spy).toHaveBeenCalled()
    await expect(spy).toHaveBeenCalledWith("http://localHost:3000/leads")
  })
  test("getBackGroundChecks ", async () => {
    const spy = jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({ check: true }) }),
        ) as jest.Mock,
      )
    const result = await services.getBackGroundChecks(123)
    expect(spy).toHaveBeenCalled()
    expect(result[0].check).toBe(true)
  })

  test("getScore ", async () => {
    const spy = jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ score: 15 }) })) as jest.Mock,
      )
    const result = await services.getScore(123)
    expect(spy).toHaveBeenCalled()
    expect(result.score).toBe(15)
  })
})
