const shelf = document.querySelector('.shelf')
const basket = document.querySelector('.basket')
const submitButton = document.querySelector('.submitButton')

const itemsArray = [
  'whine',
  'milk',
  'jam',
  'cheese',
  'meat',
  'chicken',
  'chips',
  'pineapple',
  'banana',
  'apple',
  'lettuce',
]
let draggedItem = null

const allowDrop = (event) => {
  event.preventDefault()
}

shelf.ondragover = allowDrop
basket.ondragover = allowDrop

const drag = (event) => {
  event.dataTransfer.setData('id', event.target.id)
}

const touchStart = (event) => {
  const itemId = event.target.id
  draggedItem = event.target
  draggedItem.setAttribute('data-id', itemId)

  const touch = event.touches[0]
  draggedItem.style.opacity = '0.5'
  draggedItem.startX = touch.pageX - draggedItem.offsetLeft
  draggedItem.startY = touch.pageY - draggedItem.offsetTop
}

const touchMove = (event) => {
  event.preventDefault()

  const touch = event.touches[0]
  draggedItem.style.left = `${touch.pageX - draggedItem.startX}px`
  draggedItem.style.top = `${touch.pageY - draggedItem.startY}px`
}

const handleDrop = (itemId, dropArea) => {
  dropArea.appendChild(document.getElementById(itemId))

  if (basket.children.length >= 5) {
    submitButton.style.display = 'block'
  } else {
    submitButton.style.display = 'none'
  }
}

const drop = (event) => {
  event.preventDefault()
  const dropArea = event.target.alt === 'Basket' ? basket : shelf
  let itemId = event.dataTransfer.getData('id')
  handleDrop(itemId, dropArea)
}

shelf.ondrop = drop
basket.ondrop = drop

const touchDrop = (event) => {
  event.preventDefault()

  const dropArea = event.target.y >= 700 ? basket : shelf
  const itemId = draggedItem.getAttribute('data-id')
  handleDrop(itemId, dropArea)

  draggedItem.removeAttribute('style')
  draggedItem = null
}

shelf.addEventListener('touchend', touchDrop)
basket.addEventListener('touchend', touchDrop)

itemsArray.forEach((itemId) => {
  const item = document.getElementById(itemId)

  if (item) {
    item.ondragstart = drag
    item.addEventListener('touchstart', touchStart)
    item.addEventListener('touchmove', touchMove)
    item.addEventListener('touchend', touchDrop)
  }
})
