import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'

const video = document.querySelector('.middle-video')
const capsule = document.querySelector('.main-capsule')
const capsuleHead = capsule.querySelector('.head')
const capsulePieces = capsule.querySelector('.pieces')
const capsuleLines = capsule.querySelector('.capsuleLines path')

const swiper = new Swiper('.carousel-section', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 1,
  scrollbar: false,
  speed: 700,
  spaceBetween: 30,
})

new fullpage('#fullpage', {
  licenseKey: 'R8KHJ-2KN68-IZFN6-2PMWI-ZSBML',
  scrollingSpeed: 700,
  fitToSectionDelay: 100,
  lazyLoading: false,
  onLeave: function (origin, destination, direction, trigger) {
    if (origin.index == 0 && direction == 'down') {
      capsule.className = `main-capsule toDown`
      capsuleHead.className = `head open`
      capsulePieces.className = `pieces out`
      capsuleLines.style.strokeOpacity = `0`
    }
    if (origin.index == 1) {
      if (direction === 'up') {
        capsule.className = `main-capsule toUp`
        capsuleHead.className = `head close`
        capsulePieces.className = `pieces in`
        setTimeout(() => (capsuleLines.style.strokeOpacity = `1`), 1000)
      } else if (direction === 'down') {
        capsule.className = `main-capsule out`
        capsulePieces.className = `pieces in`
        video.className = `middle-video in`
      }
    }
    if (origin.index === 2) {
      if (direction === 'up') {
        video.className = `middle-video out`
        setTimeout(() => {
          video.className = `middle-video`
          capsule.className = `main-capsule toDown`
          capsulePieces.className = `pieces out`
        }, 800)
      } else if (direction === 'down') {
        video.className = `middle-video toDown`
      }
    }
    if (origin.index === 3) {
      if (direction === 'up') {
        video.className = `middle-video toUp`
      }
    }
    if (origin.index === 3) {
      if (direction === 'down') {
        video.className = `middle-video`
      }
    }
  },
})
