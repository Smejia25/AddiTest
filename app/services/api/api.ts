import { Alert } from "react-native"
import { Lead } from "./api.types"

const leadsEndpoint = "http://localHost:3000/leads"

function handleErrors(error: string) {
  Alert.alert(error)
}

async function baseRequest(asyncCall: Promise<Response>) {
  try {
    const result = await asyncCall
    return result.json()
  } catch (error) {
    handleErrors("error Procesing the request")
  }
}

async function getLeads(): Promise<Lead[]> {
  return baseRequest(fetch(`${leadsEndpoint}`))
}

async function getBackGroundChecks(id: number): Promise<[{ check: boolean }, { check: boolean }]> {
  return Promise.all([checkNationalRegistry(id), checkJudicialRecords(id)])
}

async function checkNationalRegistry(id: number): Promise<{ check: boolean }> {
  const request = fetch(`${leadsEndpoint}/nationalRegistryCheck`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })

  return baseRequest(request)
}

async function checkJudicialRecords(id: number): Promise<{ check: boolean }> {
  const request = fetch(`${leadsEndpoint}/nationalRegistryCheck`, {
    method: "post",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  return baseRequest(request)
}

async function getScore(id: number): Promise<{ score: number }> {
  const request = fetch(`${leadsEndpoint}/scoreCheck`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
  return baseRequest(request)
}

export { getLeads, getBackGroundChecks, getScore, handleErrors, baseRequest, checkJudicialRecords }
