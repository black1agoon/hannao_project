import _public from './public'
import card from './card'
import product from './product'
import register from './register'
import dashboard from './dashboard'
export default {
  ..._public,
  ...card,
  ...product,
  ...register,
  ...dashboard
}
