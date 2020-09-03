import system from './system'
import floor from './floor'
import disinfect from './disinfect'
import mask from './mask'
export default {
  ...system,
  ...floor,
  ...disinfect,
  ...mask
}
