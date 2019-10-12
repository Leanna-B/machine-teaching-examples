let video;
let classifier = ml5.KNNClassifier(); // knn classifier
//classifier.save('emptyknn.json');
classifier.load('assets/emptyknn.json');
let posenet;
let surprise, notsurprise;
let savebutton, load;


let thepose;


function setup() {
  createCanvas(400, 400);
  video = createCapture();
  video.hide();
  posenet = ml5.poseNet(video, function(){
  console.log("posenet has loaded");
});
  
  posenet.on('pose', function(err, data){
    //https://github.com/ml5js/ml5-examples/blob/development/p5js/KNNClassification/KNNClassification_PoseNet/sketch.js
    
      //const poseArray = poses[0].pose.keypoints.map(p => [p.score, p.position.x, p.position.y]);

    thepose = data[0].pose.keypoints.map(p => [p.score, p.position.x, p.position.y]);

    //console.log(data);
    //classifier.addExample(data, 'surprise')
});
  
  surprise = createButton('Surprise');
  notsurprise = createButton('Not Surprise');
  surprise.mousePressed(function(){
    //classifier.addExample(data, 'Surprise');
 });   
  savebutton = createButton("Save Classifier");
  savebutton.mousePressed(function(){
    classifier.save('emptyknn.json');
 }); 

  
}
             
function draw() {
  background(220);
  image(video, 0, 0, width, height);
}