import { it, describe, expect } from '@jest/globals'
import { formatDate } from '../app'

describe('main app tester', () => {
  it('should process date', () => {
    const d = new Date(2018, 11, 24, 10, 33, 30)
    expect(formatDate(d)).toEqual('2018-12-24')
  })
})
