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

const section3 = document.querySelector('#section-3')
const section4 = document.querySelector('#section-4')
const section5 = document.querySelector('#section-5')
const video = document.querySelector('.middle-video')
const capsule = document.querySelector('.main-capsule')
const mobileCapsule = document.querySelector('.mobile-capsule')
const capsuleHead = capsule.querySelector('.head')
const capsulePieces = capsule.querySelector('.pieces')
const capsuleLines = capsule.querySelector('.capsuleLines path')
const middleWrapper = document.querySelector('.middle-wrapper')
const headingSection = document.querySelector('.heading-section')
const pieces = middleWrapper.querySelectorAll('.piece')
const videoCarousel = document.querySelector(`.carousel`)
const mobileMenuIcon = document.querySelector('.mobile-menu-icon')
const mobileMenu = document.querySelector('.mobile-menu')
const closeMenuIcon = document.querySelector('.close-menu')
const cartBtn = document.querySelector('.cart-btn')
let currentScrollY = 0

mobileMenuIcon.addEventListener('click', () => setMobileMenu(true))

closeMenuIcon.addEventListener('click', () => setMobileMenu(false))

function setMobileMenu(state) {
  if (state) {
    mobileMenu.className = `mobile-menu opened`
    cartBtn.className = `btn cart-btn white-btn hide`
    closeMenuIcon.className = `close-menu active`
    document.body.style.overflowY = `hidden`
    mobileMenuIcon.className = `mobile-menu-icon hide`
    headingSection.style.opacity = `0`
  } else {
    mobileMenu.className = `mobile-menu`
    closeMenuIcon.className = `close-menu out`
    document.body.style.overflowY = `scroll`
    headingSection.style.opacity = `1`
    setTimeout(() => {
      cartBtn.className = `btn cart-btn white-btn`
      mobileMenuIcon.className = `mobile-menu-icon`
    }, 500)
  }
}

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
  document.body.clientWidth > 480
    ? (capsule.className = `main-capsule init`)
    : (mobileCapsule.className = `main-capsule mobile-capsule mobileIn`)
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
const cards = cardSlider.querySelectorAll('.slider-card')
const cardsLength = cards.length

if (document.body.clientWidth <= 480) {
  cards.forEach((card) => {
    card.addEventListener('click', (e) => slideByClick(e))
  })

  window.addEventListener('scroll', () => {
    currentScrollY = window.pageYOffset

    if (
      currentScrollY + 500 >= section3.offsetTop &&
      currentScrollY < section3.offsetTop + 500
    ) {
      section3.className = `section active`
      section4.className = `section`
      section3.querySelector('video').play()
      section4.querySelector('video').pause()
    } else if (currentScrollY + 500 >= section4.offsetTop) {
      section3.className = `section`
      section4.className = `section active`
      section4.querySelector('video').play()
      section3.querySelector('video').pause()
    } else if (
      currentScrollY > section4.offsetTop + section4.clientHeight ||
      currentScrollY + 500 < section3.offsetTop
    ) {
      section5.querySelectorAll('video').forEach((video) => video.play())
      section3.className = `section`
      section4.className = `section`
      section3.querySelector('video').pause()
      section4.querySelector('video').pause()
    }
  })

  let xStart = 0
  let xEnd = 0

  cards.forEach((card) => {
    card.addEventListener('touchstart', (e) => {
      xStart = e.touches[0].clientX
    })
    card.addEventListener('touchend', (e) => {
      xEnd = e.changedTouches[0].clientX

      if (xStart > xEnd) {
        slideNext()
      } else if (xStart < xEnd) {
        slidePrev()
      }
    })
  })
}

let currentSlideIndex = 1

btnNext.addEventListener('click', () => slideNext())
btnPrev.addEventListener('click', () => slidePrev())

function slideByClick(e) {
  const target = e.target.closest('.slider-card')
  const dataID = e.target.closest('.slider-card').dataset.id
  const targetPrev = cardSliderWrapper.querySelector(
    `#card-${Number(dataID) - 1}`
  )
  const targetNext = cardSliderWrapper.querySelector(
    `#card-${Number(dataID) + 1}`
  )
  const targetNextTwo = cardSliderWrapper.querySelector(
    `#card-${Number(dataID) + 2}`
  )

  currentSlideIndex = Number(dataID)

  if (currentSlideIndex === cardsLength) {
    target.className = `card slider-card`
    cardSliderWrapper.style.transform = `translate3d(-${
      (currentSlideIndex - 1) * 150
    }px, 0 ,0)`
    return true
  } else if (currentSlideIndex === cardsLength - 1) {
    target.className = `card slider-card`
    targetNext.className = `card slider-card md`
    cardSliderWrapper.style.transform = `translate3d(-${
      (currentSlideIndex - 1) * 150
    }px, 0 ,0)`
    return true
  } else {
    target.className = `card slider-card`
    targetNext.className = `card slider-card md`
    targetNextTwo.className = `card slider-card xs`
    cardSliderWrapper.style.transform = `translate3d(-${
      (currentSlideIndex - 1) * 150
    }px, 0 ,0)`
  }
}

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
})

const cardCarouselButtonPrev = document.querySelector('.car-prev')
const cardCarouselButtonNext = document.querySelector('.car-next')
const cardCarousel = document.querySelector('.card-carousel')
const cardPanel = document.querySelector('.slider-panel')
const cardTitle = cardPanel.querySelector('.card-title')
const carouselCards = cardCarousel.querySelectorAll('.card')

carouselCards.forEach((card) =>
  card.addEventListener('click', (e) => slideCarouselByClick(e))
)

function slideCarouselByClick(e) {
  const deg = e.target.dataset.deg

  cardTitle.innerHTML = e.target.dataset.name

  cardCarousel.style.transform = `translate(-50%, 0) rotate(${deg}deg)`
}

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

  cardCarousel.style.transform = `translate(-50%, 0) rotate(${
    currentCarouselSlide * 20
  }deg)`
}

const tab11 = document.querySelector('.tab-11')
const tab12 = document.querySelector('.tab-12')
const tab13 = document.querySelector('.tab-13')

if (document.body.clientWidth > 480) {
  new fullpage('#fullpage', {
    licenseKey: 'R8KHJ-2KN68-IZFN6-2PMWI-ZSBML',
    scrollingSpeed: 700,
    fitToSectionDelay: 100,
    lazyLoading: false,
    afterLoad: function (origin, destination, direction, trigger) {
      if (origin.index === 9) {
        document.body.clientWidth > 1400
          ? (tab11.style.top = `${
              document.querySelector('.screen-11-title').offsetTop - 20
            }px`)
          : (tab11.style.top = `${
              document.querySelector('.screen-11-title').offsetTop - 10
            }px`)
        setTimeout(() => (tab11.style.transform = `rotate(-8deg)`), 100)

        document.body.clientWidth > 1400
          ? (tab12.style.top = `${
              document.querySelector('.screen-11-title').offsetTop - 16
            }px`)
          : (tab12.style.top = `${
              document.querySelector('.screen-11-title').offsetTop - 8.5
            }px`)
        tab12.style.transform = `rotate(0deg)`
        setTimeout(() => {
          tab12.style.transform = `translate(-15px, 0)`
        }, 370)

        document.body.clientWidth > 1400
          ? (tab13.style.top = `${
              document.querySelector('.screen-11-title').offsetTop - 35
            }px`)
          : (tab13.style.top = `${
              document.querySelector('.screen-11-title').offsetTop - 20
            }px`)
        setTimeout(() => {
          tab13.style.transform = `rotate(-8deg) translate(-2px, 0)`
        }, 300)
      }
    },
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
}
