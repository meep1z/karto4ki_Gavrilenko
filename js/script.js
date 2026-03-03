$(document).ready(() => {
    $('#body').css('background-color', 'beige');

    $('.text').css
    ({
        color: 'black', 
        fontSize: '32px'
    });

    $('.button').css
    ({
        'background': 'green',
        'border-radius': '10px',
        'cursor': 'pointer',
        'fontSize': '28px',
        'color': 'white'
    });

    $('.grid').css
    ({
        'display': 'flex',
        'flex-wrap': 'wrap',
        'width': '400px',
        'height': '300px',

    })

  const cardsarr = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

  cardsarr.sort(() => 0.5 - Math.random())

  const $grid = $('.grid')
  const $result = $('#result')
  const $current = $('#current')
  let chosen = []
  let chosenId = []
  let won = []

  function create() {
    for (let i = 0; i < cardsarr.length; i++) {
      const $card = $('<img>')
      $card.attr('src', 'images/blank.png')
      $card.attr('data-id', i)
      $card.on('click', flip)
      $grid.append($card)
    }
  }

  $('#btn').click( () => {
    location.reload()
  })

  function check() {
    const $cardsarr = $('img')
    const oneId = chosenId[0]
    const twoId = chosenId[1]
    
    if(oneId == twoId) {
      $cardsarr.eq(oneId).attr('src', 'images/blank.png')
      $cardsarr.eq(twoId).attr('src', 'images/blank.png')
      $result.text('тоже самое')
    }
    else if (chosen[0] === chosen[1]) {
      $cardsarr.eq(oneId).attr('src', `images/${chosen[0]}.png`)
      $cardsarr.eq(twoId).attr('src', `images/${chosen[1]}.png`)    
      $cardsarr.eq(oneId).off('click', flip)
      $cardsarr.eq(twoId).off('click', flip)
      won.push(chosen)
      $current.text('попал, +1 очко')
    } else {
      $cardsarr.eq(oneId).attr('src', 'images/blank.png')
      $cardsarr.eq(twoId).attr('src', 'images/blank.png')
      $current.text('не попал')
    }
    chosen = []
    chosenId = []
    $result.text(won.length)
    if (won.length === cardsarr.length/2) {
      $current.text('победа')
    }
  }

  function flip() {
    $('#btn').text("Завершить")
    const $this = $(this)
    let id = $this.attr('data-id')
    chosen.push(cardsarr[id].name)
    chosenId.push(id)
    $this.attr('src', cardsarr[id].img)
    if (chosen.length === 2) {
      setTimeout(check, 500)
    }
  }

  create()
})