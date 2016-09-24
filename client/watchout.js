var enemyCount = 5;

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

var width = 700,
    height = 350,
    radius = 20;

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on('drag', dragmove);

var svg = d3.select('body').append('div').selectAll('svg')
    .data(d3.range(1).map(function() { return {x: width / 2, y: height / 2}; }))
  .enter().append('svg')
    .attr('width', width)
    .attr('height', height);

svg.append('circle')
    .attr('r', radius)
    .attr('fill', 'orange')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .call(drag);

function dragmove(d) {
  d3.select(this)
      .attr('cx', d.x = Math.max(radius, Math.min(width - radius, d3.event.x)))
      .attr('cy', d.y = Math.max(radius, Math.min(height - radius, d3.event.y)));
}

play();


