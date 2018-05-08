require('./bootstrap.js');

$(document).ready(function() {
    // execute when all html element already load
});

$(window).on('load', function(event) {
  // executes when complete page is fully loaded, including all frames, objects and images 
});

$(window).on('resize', function(event) {
  // execute whenever browser window get resized
});

setTimeout(() => { console.log("ES2015 FTW"); }, 1000);