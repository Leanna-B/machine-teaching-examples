/* We're going to have quite a few variables to declare, so the first thing we're going to do is create them.

Our app is going to have a lot of functions, and it's important that all of them can access the variables - which is why we shall declare right at the start of our code */

var featureExtractor, classifier, video, loss, redCount, blueCount;

redCount = blueCount = 0;

/* I'll give you an overview of what these are for, but you'll understand them much better as we continue building our app.

featureExtractor and classifier are variables we're going to store and initialize machine learning models in.

video is where we're storing the webcam stream, while loss lets us know the progress of how far our on feature extractor has been trained.

Finally, blueCount and redCount are counters for how many images there are in each category - and we initalize both of them with a value of 0, in the next line.

setup() is a function which shall fire up as soon as our code is ready to run. Bacause of using p5.js, our code is pretty readable and easy to understand here.
*/

function setup() {
	// Tells p5 to not automatically create a canvas element.
  noCanvas();

	// Starts capturing a video feed from the webcam
  video = createCapture(VIDEO);

	// Puts the video stream into the div in our html, with ID `video`
  video.parent('video');

	// Initializes a feature extractor, yet to be trained - from ml5.js
  featureExtractor = ml5.featureExtractor('MobileNet');
  classifier = featureExtractor.classification(video);

	// What we're doing next - setting up buttons!
  setupButtons();
}
/* This code goes in your script.js file right after you declare variables - essentially, it gets a video stream and displays it on our page, inside a div with the ID video. We also make some functions using the ml5.js library here, and pass the captured video as a parameter - you'll see what we do with these soon, but there's still a little more setup left!

As you can see, at the end of setup(), we call setupButtons() - the function we're going to make next. Here, we're adding event listeners to buttons in our HTML - so we can run functions when they're clicked.

Here's all the code we write for the setupButtons() function */


// A function to create the buttons
function setupButtons() {

  buttonA = select('#red');
	buttonB = select('#blue');


​
​      buttonA.mousePressed(function() {
​    		redCount++;
​        classifier.addImage('red');
​        select('#redCount').html(redCount);
​      });


​
​      buttonB.mousePressed(function() {
​    		blueCount++;
​        classifier.addImage('blue');
​        select('#blueCount').html(blueCount);
​      });
​
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {

	// This is where we're actually training our model

      if (lossValue) {
        loss = lossValue;
        select('#info').html('Loss: ' + loss);
      } else {
        select('#info').html('Done Training! Final Loss: ' + loss);
				select('#train').style("display", "none");
				select('#predict').style("display", "inline");
      }
    });
  });

  // Predict Button
  buttonPredict = select('#predict');
  buttonPredict.mousePressed(classify);
}
