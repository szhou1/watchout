var width = 100;
var height = 150;
var radius = 20;
var enemyCount = 1;

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

  var enemies = svg.selectAll('circle.enemy')
            .data(enemyData, function(enemy) { return enemy.id; });

  enemies.enter().append('circle')
      .attr('class', 'enemy')
      .attr('cx', function(enemy) { return enemy.x; })
      .attr('cy', function(enemy) { return enemy.y; })
      .attr('r', 10);

  enemies
    .transition().duration(750).ease('linear')
    .attr('cx', function(enemy) { return enemy.x; } )
    .attr('cy', function(enemy) { return enemy.y; } );
};

var play = function() {
  
  var gameTurn = function() {
    var newEnemyPositions = createEnemies();
    render(newEnemyPositions);

  };

  gameTurn();
  setInterval(gameTurn, 1000);
};

var dragmove = function(d) {
  d3.select(this)
      .attr('cx', d.x = Math.max(radius, Math.min(width - radius, d3.event.x)))
      .attr('cy', d.y = Math.max(radius, Math.min(height - radius, d3.event.y)));

      
};

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on('drag', dragmove);

var svg = d3.select('body').append('div').selectAll('svg')
    .data(d3.range(1).map(function() { return {x: width / 2, y: height / 2}; }))
  .enter().append('svg')
    .attr('width', width)
    .attr('height', height);

var player = svg.append('circle')
    .attr('r', radius)
    .attr('class', 'player')
    .attr('fill', 'orange')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .call(drag);

var startCollisionCheck = function() {
  var check = function() {
    var x = player[0][0].cx.baseVal.value;
    var y = player[0][0].cy.baseVal.value;

    var enemies = svg.selectAll('.enemy');
    enemies[0].forEach(function(enemy) { 
      var enemyX = Number(enemy.attributes.cx.value);
      var enemyY = Number(enemy.attributes.cy.value);

      var distance = Math.sqrt(Math.pow(x - enemyX, 2) + Math.pow(y - enemyY, 2));

      // console.log(distance);
      if (distance < 30) {
        console.log("COLLISION");
      }

    });

    // console.log(enemies);
  };

  setInterval(check, 100);
};

startCollisionCheck();

console.log(player[0]);
console.log(player[0][0].cy.baseVal.value);
play();


