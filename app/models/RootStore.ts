import { getBackGroundChecks, getLeads, getScore } from "app/services/api"
import { detach, flow, Instance, SnapshotOut, types } from "mobx-state-tree"

export const Lead = types
  .model("Lead")
  .props({
    firstName: types.string,
    lastName: types.string,
    email: types.string,
    birthDate: types.string,
    guid: types.number,
    url: types.string,
    recordsCheck: types.maybe(types.boolean),
    registryCheck: types.maybe(types.boolean),
    score: types.maybe(types.number),
  })
  .actions((self) => ({
    setBackgroundChecksResults(registryCheckResult: boolean, recordsCheckResult: boolean) {
      self.recordsCheck = recordsCheckResult
      self.registryCheck = registryCheckResult
    },
    setScoreResults(score: number) {
      self.score = score
    },
  }))
  .actions((self) => ({
    getBackgroundChecks() {
      flow(function* () {
        const [existInRegistry, hasJudicialRecords] = yield getBackGroundChecks(self.guid)
        if (!!existInRegistry && !!hasJudicialRecords) {
          self.setBackgroundChecksResults(existInRegistry.check, hasJudicialRecords.check)
        }
      })()
    },
    getScore() {
      flow(function* () {
        const { score } = yield getScore(self.guid)
        if (score) {
          self.setScoreResults(score)
        }
      })()
    },
  }))

export const LeadsStoreModel = types
  .model("LeadsStore")
  .props({
    leads: types.array(Lead),
    Prospects: types.array(Lead),
  })
  .actions((self) => ({
    setLeads(leads: typeof self.leads) {
      self.leads = leads
    },
    promote(prospect: ILead) {
      self.Prospects.push(detach(prospect))
      self.leads.remove(prospect)
    },
  }))
  .actions((self) => ({
    afterCreate() {
      flow(function* () {
        const leads = yield getLeads()
        if (leads) self.setLeads(leads)
      })()
    },
  }))

export interface LeadsStore extends Instance<typeof LeadsStoreModel> {}
export interface ILead extends Instance<typeof Lead> {}

export interface LeadsStoreSnapshot extends SnapshotOut<typeof LeadsStoreModel> {}
