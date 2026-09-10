export type ProlificIdentity = {
  prolificPid: string
  sessionId: string
  studyId: string
}

export type ProlificEntry = {
  identity: ProlificIdentity | null
  error: string | null
}

// This public reference supports local inspection only.
export function readProlificEntry(search = window.location.search): ProlificEntry {
  const params = new URLSearchParams(search)
  const supplied = ['PROLIFIC_PID', 'SESSION_ID', 'STUDY_ID'].some((key) => params.has(key))
  return {
    identity: null,
    error: supplied
      ? 'This is a local study reference. Remove Prolific parameters and use a fictional participant code.'
      : null,
  }
}

export async function prolificRequest<T>(_pathname: string, _body: Record<string, unknown>): Promise<T> {
  throw new Error('Online response submission is disabled in this local study reference.')
}
