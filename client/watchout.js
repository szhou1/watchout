var width = 900;
var height = 750;
var radius = 20;
var enemyCount = 30;
var currentScore = d3.select('.current > span')[0][0];
var highScore = d3.select('.highscore > span')[0][0];
var collisionCount = d3.select('.collisions > span')[0][0];
var hadCollision = false;

var createEnemies = function() {
  return d3.range(enemyCount).map(function(i) {
    return {
      id: i,
      x: Math.random() * width,
      y: Math.random() * height
    };
  });  
};

var render = function(enemyData) {

  var enemies = svg.selectAll('image.enemy')
            .data(enemyData, function(enemy) { return enemy.id; });

  enemies.enter().append('image')
      .attr('class', 'enemy')
      .attr('x', function(enemy) { return enemy.x; })
      .attr('y', function(enemy) { return enemy.y; })
      // .attr('x', 50)
      // .attr('y', 50)
      .attr('width', 20).attr('height', 20)
      .attr('xlink:href', 'images/asteroid.png');

  enemies
    .transition().duration(3000).ease('linear')
    .attr('x', function(enemy) { return enemy.x; } )
    .attr('y', function(enemy) { return enemy.y; } );
};

var play = function() {
  
  var gameTurn = function() {
    var newEnemyPositions = createEnemies();
    render(newEnemyPositions);

  };

  gameTurn();
  setInterval(gameTurn, 3100);
};

var dragmove = function(d) {
  d3.select(this)
      .attr('x', d.x = Math.max(radius, Math.min(width - radius, d3.event.x)))
      .attr('y', d.y = Math.max(radius, Math.min(height - radius, d3.event.y)));

      
};

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on('drag', dragmove);

var svg = d3.select('body').append('div').selectAll('svg')
    .data([{x: width / 2, y: height / 2}])
  .enter().append('svg')
    .attr('width', width)
    .attr('height', height);

// var player = svg.append('circle')
//     .attr('r', radius)
//     .attr('class', 'player')
//     // .attr('fill', 'orange')
//     .attr('cx', function(d) { return d.x; })
//     .attr('cy', function(d) { return d.y; })
//     .call(drag);
var player = svg.append('image')
    .attr('class', 'player')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; })
    .attr('width', 40).attr('height', 40)
    .attr('xlink:href', 'images/xwing.png')
    .call(drag);

var startCollisionCheck = function() {
  var check = function() {
    var x = player[0][0].x.baseVal.value;
    var y = player[0][0].y.baseVal.value;

    var enemies = svg.selectAll('.enemy');
    enemies[0].forEach(function(enemy) { 
      var enemyX = Number(enemy.attributes.x.value);
      var enemyY = Number(enemy.attributes.y.value);

      var distance = Math.sqrt(Math.pow(x - enemyX, 2) + Math.pow(y - enemyY, 2));

      if (distance < 30) {
        if (Number(currentScore.innerHTML) > Number(highScore.innerHTML)) {
          highScore.innerHTML = currentScore.innerHTML;
        }
        currentScore.innerHTML = 0;

        if (!hadCollision) {
          collisionCount.innerHTML++;
          hadCollision = true;
          player.attr('xlink:href', 'images/explosion.gif');
          setTimeout(updateImage, 500);
        }

      }

    });

  };

  setInterval(check, 100);
};

var updateImage = function() {
  hadCollision = false;
  player.attr('xlink:href', 'images/xwing.png');
};

startCollisionCheck();

var startScoreCounter = function() {
  var incrementScore = function() {
    currentScore.innerHTML++;
  };

  setInterval(incrementScore, 1);
};
startScoreCounter();
  
// console.log(player[0]);
// console.log(player[0][0].cy.baseVal.value);
play();


