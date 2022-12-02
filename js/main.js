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

const cardSlider = document.querySelector('.cards-slider')
const btnPrev = cardSlider.querySelector('.slider-btn.left')
const btnNext = cardSlider.querySelector('.slider-btn.right')
const cardSliderWrapper = cardSlider.querySelector('.cards')
const cards = cardSlider.querySelectorAll('.card')
const cardsLength = cards.length
let currentSlideIndex = 1

btnNext.addEventListener('click', () => slideNext())
btnPrev.addEventListener('click', () => slidePrev())

function slidePrev() {
  if (currentSlideIndex !== 1) {
    currentSlideIndex -= 1
    disableButton()

    if (currentSlideIndex === cardsLength - 1) {
      cardSlider.querySelector(
        `#card-${currentSlideIndex + 1}`
      ).className = `card md`
      cardSlider.querySelector(`#card-${currentSlideIndex}`).className = `card`
      cardSliderWrapper.style.transform = `translate3d(-${
        (currentSlideIndex - 1) * 150
      }px, 0 ,0)`
    } else {
      cardSlider.querySelector(`#card-${currentSlideIndex}`).className = `card`

      cardSlider.querySelector(
        `#card-${currentSlideIndex + 1}`
      ).className = `card md`

      cardSlider.querySelector(
        `#card-${currentSlideIndex + 2}`
      ).className = `card xs`

      cardSliderWrapper.style.transform = `translate3d(-${
        (currentSlideIndex - 1) * 130
      }px, 0 ,0)`
    }
  }
}

function disableButton() {
  if (currentSlideIndex === cardsLength) {
    btnNext.className = `slider-btn right`
  } else {
    btnNext.className = `slider-btn right active`
  }
  if (currentSlideIndex === 1) {
    btnPrev.className = `slider-btn left`
  } else {
    btnPrev.className = `slider-btn left active`
  }
}

function slideNext() {
  if (currentSlideIndex !== cardsLength) {
    currentSlideIndex += 1
    disableButton()

    if (currentSlideIndex === cardsLength) {
      cardSlider.querySelector(`#card-${currentSlideIndex}`).className = `card`
      cardSliderWrapper.style.transform = `translate3d(-${
        (currentSlideIndex - 1) * 160
      }px, 0 ,0)`
      return true
    }

    if (currentSlideIndex === cardsLength - 1) {
      cardSlider.querySelector(`#card-${currentSlideIndex}`).className = `card`
      cardSlider.querySelector(
        `#card-${currentSlideIndex + 1}`
      ).className = `card md`
      cardSliderWrapper.style.transform = `translate3d(-${
        (currentSlideIndex - 1) * 150
      }px, 0 ,0)`
    } else {
      cardSlider.querySelector(
        `#card-${currentSlideIndex - 1}`
      ).className = `card xs`
      cardSlider.querySelector(`#card-${currentSlideIndex}`).className = `card`
      cardSlider.querySelector(
        `#card-${currentSlideIndex + 1}`
      ).className = `card md`
      cardSlider.querySelector(
        `#card-${currentSlideIndex + 2}`
      ).className = `card xs`
      cardSliderWrapper.style.transform = `translate3d(-${
        (currentSlideIndex - 1) * 130
      }px, 0 ,0)`
    }
  }
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

let activeVideoSlide = swiper.activeIndex

videoCarousel.addEventListener('wheel', () => {
  activeVideoSlide === 3 ? fullpage_api.moveTo(6) : void 0
})

swiper.on('slideChange', () => {
  setTimeout(() => {
    activeVideoSlide = swiper.activeIndex
  }, 500)
  console.log(activeVideoSlide)
})

const cardCarouselButtonPrev = document.querySelector('.car-prev')
const cardCarouselButtonNext = document.querySelector('.car-next')
const cardCarousel = document.querySelector('.card-carousel')
const cardPanel = document.querySelector('.slider-panel')
const cardTitle = cardPanel.querySelector('.card-title')

let currentCarouselSlide = 0

function updateCardInfo(id) {
  if (
    id === 0 ||
    id === 5 ||
    id === -5 ||
    id === 10 ||
    id === -10 ||
    id === 15 ||
    id === -15 ||
    id === 20 ||
    id === -20
  ) {
    cardTitle.innerHTML = 'GOLD STANDART'
  } else if (
    id === 1 ||
    id === -1 ||
    id === 6 ||
    id === -6 ||
    id === 11 ||
    id === -11 ||
    id === -16 ||
    id === 16 ||
    id === -21 ||
    id === 21
  ) {
    cardTitle.innerHTML = '3 MONTH'
  } else if (
    id === 2 ||
    id === -2 ||
    id === 7 ||
    id === -7 ||
    id === 12 ||
    id === -12 ||
    id === 17 ||
    id === -17 ||
    id === 22 ||
    id === -22
  ) {
    cardTitle.innerHTML = 'TRAVEL SIZE'
  } else if (
    id === 3 ||
    id === -3 ||
    id === 8 ||
    id === -8 ||
    id === 13 ||
    id === -13 ||
    id === 18 ||
    id === -18 ||
    id === -23 ||
    id === 23
  ) {
    cardTitle.innerHTML = 'BUNDLE'
  } else if (
    id === 4 ||
    id === -4 ||
    id === 9 ||
    id === -9 ||
    id === -14 ||
    id === 14 ||
    id === -19 ||
    id === 19 ||
    id === 24 ||
    id === -24
  ) {
    cardTitle.innerHTML = 'UNISEX HOODIE'
  }
}

cardCarouselButtonNext.addEventListener('click', () =>
  slideNextCarousel('next')
)

cardCarouselButtonPrev.addEventListener('click', () =>
  slideNextCarousel('prev')
)

console.log(cardCarouselButtonNext)

function slideNextCarousel(direction) {
  if (direction === 'next') {
    if (currentCarouselSlide === -24) {
      currentCarouselSlide = 0
      updateCardInfo(currentCarouselSlide)
    }
    currentCarouselSlide -= 1
    updateCardInfo(currentCarouselSlide)
  } else {
    if (currentCarouselSlide === 24) {
      currentCarouselSlide = 0
      updateCardInfo(currentCarouselSlide)
    }
    currentCarouselSlide += 1
    updateCardInfo(currentCarouselSlide)
  }

  cardCarousel.style.transform = `rotate(${currentCarouselSlide * 15}deg)`
  console.log(currentCarouselSlide)
}

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
        if (activeVideoSlide === 0) {
          video.className = `middle-video inBig`
        } else return false
      }
    }
    if (origin.index === 5) {
      if (direction === 'up') {
        swiper.slideTo(0, 800, false)
        document.querySelectorAll('video').forEach((video) => video.play())
      }
    }
  },
})
