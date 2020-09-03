export const serverList = {
  main: process.env.VUE_APP_SERVER_MAIN,
  energy: process.env.VUE_APP_SERVER_ENERGY,
  jlw: process.env.VUE_APP_SERVER_JLW,
}

export const rabbitMq = {
  url: process.env.VUE_APP_MQ_URL,
  username: process.env.VUE_APP_MQ_USER,
  password: process.env.VUE_APP_MQ_PASS,
}

export const timerConfig = {
  fetching: 60,
  energySlide: 10,
}
