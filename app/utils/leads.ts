export const isProspect = (score: number | undefined) => {
  if (score !== undefined) return score > 60
  else return undefined
}
