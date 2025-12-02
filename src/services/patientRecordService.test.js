import { verifyAccess, getPatientRecord, updatePatientRecord } from './patientRecordService'

describe('patientRecordService', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  it('verifies access', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ accessGranted: true }) })
    const res = await verifyAccess('Clinician', 'P001')
    expect(res.accessGranted).toBe(true)
    expect(global.fetch).toHaveBeenCalledWith('/api/patients/verify-access', expect.any(Object))
  })

  it('gets patient record with id normalization', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) })
    const res = await getPatientRecord('P001')
    expect(res.success).toBe(true)
    expect(global.fetch).toHaveBeenCalledWith('/api/patients/001', expect.any(Object))
  })

  it('updates patient record', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) })
    const res = await updatePatientRecord('P002', { a: 1 })
    expect(res.success).toBe(true)
    expect(global.fetch).toHaveBeenCalledWith('/api/patients/002', expect.any(Object))
  })
})

