import express, { Request, Response } from "express"
import { MOCKLEADS } from "./mockLeads"

const router = express.Router()

const leads = MOCKLEADS

router.get("/", (_req, res, _next) => {
  res.header("Content-Type", "application/json")
  res.json(leads)
})

router.post("/nationalRegistryCheck", async (req: Request, res: Response, _next) => {
  if (req.body && req.body.id) {
    res.header("Content-Type", "application/json")

    console.log(req.body)
    const randomBoolean: boolean = Math.random() < 0.5
    res.json({ check: randomBoolean })
  } else res.status(500)
})
router.post("/judicialCheck", async (req: Request, res: Response, _next) => {
  if (req.body && req.body.id) {
    res.header("Content-Type", "application/json")

    const randomBoolean: boolean = Math.random() < 0.5
    res.json({ check: randomBoolean })
  } else res.status(500)
})

router.post("/scoreCheck", async (req: Request, res: Response, _next) => {
  if (req.body && req.body.id) {
    res.header("Content-Type", "application/json")
    const score = Math.floor(Math.random() * 100) + 40
    res.json({ score })
  } else res.status(500)
})

export default router
