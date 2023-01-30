let btn = document.querySelector('.header button')
let menu = document.querySelector('.header ul')
let nav = document.querySelector('.header')
const mobileMenu = () => {
  if(btn.innerText === 'MENU'){
    btn.innerText = 'CLOSE'
    menu.style.display = 'block'
    nav.style.marginBottom = '250px'
  }
  else{
    menu.style.display = 'none'
    btn.innerText = 'MENU'
    nav.style.marginBottom = '50px'
  }
}
let rightBtn = document.querySelector('#right-btn')
let leftBtn = document.querySelector('#left-btn')
let imagesSlider = document.querySelectorAll( '.slider-images img')
let position = 0
const displayNone = (elems) => {
  elems.forEach((elem) =>{
    elem.style.display= 'none'
  })
}
const displayAll = (elems) => {
  elems.forEach((elem) =>{
    elem.style.display= 'block'
  })
}
const listenerMoveRight = () => {
  position++
  if(position === imagesSlider.length){
    position = 0
  }
  displayNone(imagesSlider)
  imagesSlider[position].style.display='block'
};
let listenerMoveLeft = () => {
  position--
  if(position < 0){
    position = imagesSlider.length - 1
  }
  displayNone(imagesSlider)
  imagesSlider[position].style.display='block'

};
rightBtn.addEventListener('click',listenerMoveRight)
leftBtn.addEventListener('click',listenerMoveLeft)
const portfolioSort = (button) => {
  let category = button.getAttribute('data-category')
  console.log(category)
  let portfolioItems = document.querySelectorAll('.portfolio-single-item')
  displayNone(portfolioItems)
  if(category === 'sve'){
    displayAll(portfolioItems)
  }
  let items = []
  portfolioItems.forEach((item) => {
      if(item.getAttribute('data-category').includes(category)){
        items.push(item)
      }
    })
  displayAll(items)
  console.log(items)

}
let modal = document.querySelector('.popup-modal')
let overlay = document.querySelector('.overlay')
const openModal = () => {
  modal.style.display = 'block'
  overlay.style.display = 'block'
}
const closeModal = () => {
  modal.style.display = 'none'
  overlay.style.display = 'none'
}