


Parse.User.logIn("user","pass", {
  success:function(user) {
    query.find({
      success:function(results) {
        results[0].save({ key: value }, {
          success:function(result) {
            // the object was saved.
          }
        });
      }
    });
  }
});

Parse.User
  .logIn("user","pass")
  .then(function(user) {
    returnquery.find();
  })
  .then(function(results) {
    returnresults[0].save({ key: value });
  })
  .done();









//--use describe to define a test suit
describe("A suite", function() {
  //--use it to define a test spec
  it("contains spec with an expectation", function() {
  	//--BDD style expect
    expect(true).toBe(true);
  });
});

//--server
var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

//--client
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
</script>