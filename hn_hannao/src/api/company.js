import { request } from './common'
import config from '@/config'
const prev = '/service'

export default {
  company: {
    getOverview (id) {
      return request('post', config.serverURI + prev + '/idsResolveOverview/idsCompanyOverview', { id })
    },
    getPlants (id) {
      return request('post', config.serverURI + prev + '/idsResolveOverview/idsCompanyPlantsByCompanyId', { id })
    },
    getWorkshops (id) {
      return request('post', config.serverURI + prev + '/idsResolveOverview/idsCompanyWorkshopByPlantId', { id })
    },
    getWorkshopStations (id) {
      return request('post', config.serverURI + prev + '/idsResolveOverview/idsCompanyStationByWorkshopId', { id })
    },
  },
}
