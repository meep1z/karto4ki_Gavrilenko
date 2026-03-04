$(document).ready(() => {
  $('#body').css('background-color', 'beige');

  $('.text').css({
      color: 'black', 
      fontSize: '32px'
  });

  $('.button').css({
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
        'width': '500px',
        'height': '300px',
        'gap': '10px', // зазоры
    })

  const cardsarr = [
      {
          name: 'fries',
          img: 'images/fries.png',
          isGold: false
      },
      {
          name: 'cheeseburger',
          img: 'images/cheeseburger.png',
          isGold: false
      },
      {
          name: 'ice-cream',
          img: 'images/ice-cream.png',
          isGold: false
      },
      {
          name: 'pizza',
          img: 'images/pizza.png',
          isGold: false
      },
      {
          name: 'milkshake',
          img: 'images/milkshake.png',
          isGold: false
      },
      {
          name: 'hotdog',
          img: 'images/hotdog.png',
          isGold: false
      },
      {
          name: 'fries',
          img: 'images/fries.png',
          isGold: false
      },
      {
          name: 'cheeseburger',
          img: 'images/cheeseburger.png',
          isGold: false
      },
      {
          name: 'ice-cream',
          img: 'images/ice-cream.png',
          isGold: false
      },
      {
          name: 'pizza',
          img: 'images/pizza.png',
          isGold: false
      },
      {
          name: 'milkshake',
          img: 'images/milkshake.png',
          isGold: false
      },
      {
          name: 'hotdog',
          img: 'images/hotdog.png',
          isGold: false
      }
  ];

  const cards = ['fries', 'cheeseburger', 'ice-cream', 'pizza', 'milkshake', 'hotdog'];
  const randomGoldCard = cards[Math.floor(Math.random() * cards.length)];
  
  cardsarr.forEach((card, index) => {
      if (card.name === randomGoldCard) {
          card.isGold = true;
      }
  });

  cardsarr.sort(() => 0.5 - Math.random());

  const $grid = $('.grid');
  const $result = $('#result');
  const $current = $('#current');
  const $attempts = $('#attempts');
  let chosen = [];
  let chosenId = [];
  let won = [];
  let lock = false;
  
  let attempt = 0;
  let founded = false;

  let goldCardNum = 0;


  function create() {
      for (let i = 0; i < cardsarr.length; i++) {
          const $card = $('<img>');
          $card.attr('src', 'images/blank.png');
          $card.attr('data-id', i);
          
          if (cardsarr[i].isGold) {
              $card.addClass('gold-card');
          }
          
          $card.on('click', flip);
          $grid.append($card);
      }
  }

  $('#btn').click(() => {
      location.reload();
  });

  function update() {
    $attempts.text(attempt);
}

  function check() {
      const $cardsarr = $('img');
      const oneId = chosenId[0];
      const twoId = chosenId[1];
      
      attempt++;
      
      if (oneId == twoId) {
          $cardsarr.eq(oneId).attr('src', 'images/blank.png');
          $cardsarr.eq(twoId).attr('src', 'images/blank.png');
          $current.text(`попытка ${attempt}: та же карта`);
      }
      else if (chosen[0] === chosen[1]) {
          const firstGoldCard = cardsarr[oneId].isGold;
          const secondGoldCard = cardsarr[twoId].isGold;
          
          won.push(chosen);
          
          let points = 0;
          
          if (attempt === 1) {
              points = 10;
              $current.text('попал, +10 очков');
          } else if (attempt === 2) {
              points = 5;
              $current.text('попал, +5 очков');
          } else {
            $current.text('попал, +0 очков');
          }
          
          if ((firstGoldCard && secondGoldCard) && attempt <= 2) {
              founded = true;
              points *= 2;
              $current.text($current.text() + ' золотая пара, очки x2');
          }
          
          let currentScore = parseInt($result.text()) || 0;
          $result.text(currentScore + points);
          
          $cardsarr.eq(oneId).attr('src', `images/${chosen[0]}.png`);
          $cardsarr.eq(twoId).attr('src', `images/${chosen[1]}.png`);    
          $cardsarr.eq(oneId).off('click', flip);
          $cardsarr.eq(twoId).off('click', flip);
          
      } else {
          $cardsarr.eq(oneId).attr('src', 'images/blank.png');
          $cardsarr.eq(twoId).attr('src', 'images/blank.png');
          $current.text(`не попал`);
      }
      
      chosen = [];
      chosenId = [];
      update();
      
      if (won.length === cardsarr.length / 2) {
          $current.text(`победа! всего попыток: ${attempt}`);
      }
      lock = false;
  }

  function flip() {
      if (lock) return '';
      $('#btn').text("Завершить");
      const $this = $(this);
      let id = $this.attr('data-id');
      if ($this.attr('src') !== 'images/blank.png') return '';
      chosen.push(cardsarr[id].name);
      chosenId.push(id);
      $this.attr('src', cardsarr[id].img);
      
      if (chosen.length === 2) {
          lock = true;
          setTimeout(check, 500);
      }
  }
  update()
  create();
});