export const today = new Date().toISOString().replace(/T.*/, '')
export const yesterday = new Date(new Date().setHours(-1)).toISOString().replace(/T.*/, '')
export const thisMonth = today.replace(/-\d*$/, '')
export const lastMonth = new Date(new Date().setDate(-1)).toISOString().replace(/-\d*T.*/, '')
export const dayOfMonth = () => new Date().getDate()
export const hourOfDay = () => new Date().getHours()
export const last15Days = [
  ...Array(new Date(new Date().setDate(0)).getDate()).fill(0).map((_, i) => [lastMonth, i + 1].join('-')),
  ...Array(dayOfMonth()).fill(0).map((_, i) => [thisMonth, (i + 1)].join('-')),
].slice(-15)
