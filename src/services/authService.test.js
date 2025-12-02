import { authenticateUser } from './authService'

describe('authService', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    console.error.mockRestore()
  })

  it('authenticates successfully', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ success: true, role: 'Doctor' }) })
    const res = await authenticateUser('user', 'pw')
    expect(res.success).toBe(true)
    expect(global.fetch).toHaveBeenCalledWith('/api/operators/authenticate', expect.any(Object))
  })

  it('handles network error', async () => {
    global.fetch.mockRejectedValue(new Error('net'))
    const res = await authenticateUser('user', 'pw')
    expect(res.success).toBe(false)
  })
})
