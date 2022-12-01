import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'

const vitaminesData = [
  `Microdosing has proven to increase awareness, boost mood, improve engagement, and enhance focus. Our Gold Standard capsules contain 150mg of Golden Teacher psilocybin.`,

  '5-HTP is a compound product derived from the seeds of the African plant known as Griffon simplicifolia. It is known for its natural ability to increase the production of the chemical serotonin. ',

  `Vitamin D3 plays a vital role in strengthening bones and teeth. Sun exposure is one way to absorb this vitamin, but as sun exposure isn’t always promised, so taking supplementary vitamin D3 is necessary to maintain adequate levels. 
`,
  'Vitamin B12 is a nutrient that supports and nourishes the nervous system, brain, and red blood cell production. It helps support high energy levels.',

  'Ginkgo Biloba helps to enhance memory, social behaviour and cognitive function in adults. ',

  'Magnesium is an important mineral for your body. It is essential to your heart, metabolic, and bone health. ',
]

const video = document.querySelector('.middle-video')
const capsule = document.querySelector('.main-capsule')
const capsuleHead = capsule.querySelector('.head')
const capsulePieces = capsule.querySelector('.pieces')
const capsuleLines = capsule.querySelector('.capsuleLines path')
const middleWrapper = document.querySelector('.middle-wrapper')
const pieces = middleWrapper.querySelectorAll('.piece')
const videoCarousel = document.querySelector(`.carousel`)

// section 2 dropdown
const dropdown = document.querySelector('.dropdown')
const dropdownItems = dropdown.querySelectorAll('li')

// section 7 select
const select = document.querySelector('.select')
const selectItems = select.querySelectorAll('li')
const selectInfo = document.querySelector('.select-info')
const selectTitle = selectInfo.querySelector('h4')
const selectText = selectInfo.querySelector('p')

selectItems.forEach((item) =>
  item.addEventListener('click', (e) => selectThis(e))
)

function resetActiveSelects(e) {
  selectItems.forEach((item) => (item.className = ''))

  e.target.className = `active`
}

function selectThis(e) {
  const id = e.target.id

  resetActiveSelects(e)

  selectText.innerHTML = vitaminesData[id]
  selectTitle.innerHTML = e.target.innerHTML
}

function closeAllDropdowns() {
  dropdownItems.forEach((item) => {
    item.className = ``
    item.querySelector('.body').className = `body`
  })
}

function openDropdown(e) {
  const dropdownBody = e.target.querySelector('.body')
  closeAllDropdowns()

  e.target.className = `li active`
  dropdownBody.className = `body opened`
}

dropdownItems.forEach((item) => {
  item.addEventListener('click', (e) => openDropdown(e))
})

let canSlideTop = false

setTimeout(() => {
  capsule.className = `main-capsule init`
}, 100)

middleWrapper.addEventListener('mouseout', () => {
  pieces.forEach((piece) => (piece.style.marginLeft = 0))
})

middleWrapper.addEventListener('mousemove', (e) => {
  if (e.target.closest('.part.left')) {
    pieces.forEach((piece) => {
      piece.style.marginLeft = '40px'
    })
  }
  if (e.target.closest('.part.right')) {
    pieces.forEach((piece) => {
      piece.style.marginLeft = '-40px'
    })
  }
})

const slider = document.querySelector('.slider-wrapper')
const sliderItems = document.querySelector('.slider-items')
const btnPrev = document.querySelector('.slider-btn.left')
const btnNext = document.querySelector('.slider-btn.right')
let currentSlide = 3

btnNext.addEventListener('click', () => {
  if (currentSlide !== 5) {
    currentSlide++
    slide(currentSlide)
  }
})

btnPrev.addEventListener('click', () => {
  if (currentSlide !== 1) {
    currentSlide--
    slide(currentSlide)
  }
})

function slide(id) {
  sliderItems.className = `slider-items slide-${id}`
}

const swiper = new Swiper('.carousel-section', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 1,
  scrollbar: false,
  speed: 700,
  spaceBetween: 30,
  mousewheel: true,
})

videoCarousel.addEventListener('wheel', (e) => {
  let slide = e.target
    .closest('#section-5')
    .querySelector('.swiper-slide-active')
  if (slide.ariaLabel === `1 / 4`) {
    canSlideTop = true
  } else {
    canSlideTop = false
  }
  if (slide.ariaLabel === `4 / 4`) {
    swiper.mousewheel.disable()
  }
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
      console.log(swiper.mousewheel.enabled)
      if (direction === 'down') {
        video.className = `middle-video`
        document.querySelectorAll('video').forEach((video) => video.play())
      }
    }
    if (origin.index === 4) {
      if (direction === 'up') {
        if (canSlideTop) {
          video.className = `middle-video inBig`
        } else if (!canSlideTop) {
          return false
        }
      }
    }
    if (origin.index === 5) {
      if (direction === 'up') {
        swiper.mousewheel.enable()
        document.querySelectorAll('video').forEach((video) => video.play())
      }
    }
  },
})
