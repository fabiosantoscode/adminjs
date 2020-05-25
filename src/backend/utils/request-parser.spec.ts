import { expect } from 'chai'
import requestParser from './request-parser'
import { ActionRequest } from '../actions/action.interface'
import BaseResource from '../adapters/base-resource'
import BaseProperty from '../adapters/base-property'

describe('RequestParser', function () {
  describe('boolean values', function () {
    const baseRequest: ActionRequest = {
      params: { resourceId: 'resourceId', action: 'edit' },
      method: 'post',
      payload: {},
    }

    const resource = {
      property: name => new BaseProperty({ path: name, type: 'boolean' }),
    } as BaseResource

    it('removes it from the request when empty string is given', function () {
      const request = { ...baseRequest, payload: { isHired: '' } }

      expect(requestParser(request, resource).payload?.isHired).to.be.undefined
    })

    it('changes "true" string to true', function () {
      const request = { ...baseRequest, payload: { isHired: 'true' } }

      expect(requestParser(request, resource).payload?.isHired).to.be.true
    })

    it('changes "false" string to true', function () {
      const request = { ...baseRequest, payload: { isHired: 'false' } }

      expect(requestParser(request, resource).payload?.isHired).to.be.false
    })
  })
})
