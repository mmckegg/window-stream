var Through = require('through')

module.exports = function(externalWindow, origin){

  if (origin && origin.charAt(0) == '/'){
    origin = window.location.origin + origin
  }

  var stream = Through(function(data){
    externalWindow.postMessage(data, origin || '*')
  })

  window.addEventListener("message", function(event){
    if (event.data == 'process-tick') return

    if (!origin || origin == '*' || origin.slice(0, event.origin.length) == event.origin){
      stream.queue(event.data)
    }
  }, false)

  return stream
}