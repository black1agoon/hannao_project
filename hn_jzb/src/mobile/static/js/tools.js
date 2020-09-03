export function preloadImages(lists) {
  let loadedImage = 0
  let newImages = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < lists.length; i++) {
      newImages[i] = new Image()
      newImages[i].src = lists[i].src
      newImages[i].onload = () => {
        loadedImage++
        if (loadedImage === lists.length) {
          resolve()
        }
      }
      newImages[i].onerror = () => {
        reject()
      }
    }
    // console.log(newImages)
  })
}
