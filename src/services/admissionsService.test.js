import { submitADTMessage, getAdmissionRecords, getPatientAdmissions } from './admissionsService'

describe('admissionsService', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  it('submits ADT message', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ confirmationId: 'c1' }) })
    const res = await submitADTMessage({ patientId: 'P001', admissionType: 'ADMISSION' })
    expect(res.success).toBe(true)
    expect(global.fetch).toHaveBeenCalledWith('/api/admission/createAdmission', expect.any(Object))
  })

  it('lists admission records', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ([{ id: 1 }]) })
    const res = await getAdmissionRecords()
    expect(res.success).toBe(true)
    expect(global.fetch).toHaveBeenCalledWith('/api/admission/all', expect.any(Object))
  })

  it('gets patient admissions with normalization', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ([{ id: 1 }]) })
    const res = await getPatientAdmissions('P002')
    expect(res.success).toBe(true)
    expect(global.fetch).toHaveBeenCalledWith('/api/admission/patient/002', expect.any(Object))
  })
})

