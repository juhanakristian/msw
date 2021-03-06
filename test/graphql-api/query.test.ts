import * as path from 'path'
import { TestAPI, runBrowserWith } from '../support/runBrowserWith'
import { executeOperation } from './utils/executeOperation'

describe('GraphQL: Query', () => {
  let test: TestAPI

  beforeAll(async () => {
    test = await runBrowserWith(path.resolve(__dirname, 'query.mocks.ts'))
  })

  afterAll(() => {
    return test.cleanup()
  })

  it('should mock the query response', async () => {
    const res = await executeOperation(test.page, {
      query: `
        query GetUserDetail {
          user {
            firstName
            lastName
          }
        }
      `,
    })
    const headers = res.headers()
    const body = await res.json()

    expect(res.status()).toEqual(200)
    expect(headers).toHaveProperty('content-type', 'application/json')
    expect(body).toEqual({
      data: {
        user: {
          firstName: 'John',
          lastName: 'Maverick',
        },
      },
    })
  })
})
