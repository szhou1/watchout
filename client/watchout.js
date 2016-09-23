// start slingin' some d3 here.
var svg = d3.select('svg');
var width = +svg.attr('width');
var height = +svg.attr('height');
var enemyCount = 30;

var gameStats = {
  score: 0,
  bestscore: 0
};

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

  // enemies = svg.selectAll('.circle')
  //     .data(enemyData) //, function(d) { return d.id; }
  enemies.enter().append('circle')
      .attr('class', 'enemy')
      // .attr('id', function(enemy) { return enemy.id; })
      .attr('cx', function(enemy) { return enemy.x; })
      .attr('cy', function(enemy) { return enemy.y; })
      .attr('r', 10);


  enemies
    .transition().duration(750).ease('linear')
    .attr('cx', function(enemy) { return enemy.x; } )
    .attr('cy', function(enemy) { return enemy.y; } );
        

  console.log(enemies);
};

var play = function() {
  var gameTurn = function() {
    var newEnemyPositions = createEnemies();
    render(newEnemyPositions);
  };

  gameTurn();
  setInterval(gameTurn, 1000);
};

play();







