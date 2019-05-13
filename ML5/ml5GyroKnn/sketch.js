const knnClassifier = ml5.KNNClassifier();
let butTrain1, butTrain2, butReset1, butReset2;
let class1Examples, class2Examples;
let currentClass = 'nothing trained';
let debug = true;
let debugString = 'nothing trained';

function setup() {
  createCanvas(windowWidth, windowHeight);

  butTrain1 = createButton('Train class 1');
  butTrain1.position(20, 40);
  butTrain1.touchStarted(function(){
    trainModel(getOrientation(), '1');
  });

  butReset1 = createButton('Reset class 1');
  butReset1.position(20, 60);
  butReset1.touchStarted(function(){
    trainModel(getOrientation(), '1');
  });


  butTrain2 = createButton('Train class 2');
  butTrain2.position(20, 80);
  butTrain2.touchStarted(function(){
    trainModel(getOrientation(), '2');
  })

  butReset2 = createButton('Reset class 2');
  butReset2.position(20, 100);
  butReset2.touchStarted(function(){
    trainModel(getOrientation(), '2');
  });
}

function draw() {
  background(255);
  if(debug){
    console.log(currentClass);
    text(debugString, 20, 150);
  }

  text(currentClass, 20, 20);
}

function trainModel(features, label){
  if(debug){
    console.log('training label ' + label);
    debugString = 'training label ' + label;
  }
  knnClassifier.addExample(features, label);
}

function deviceMoved(){
  if(debug){
    console.log('device moved')
    debugString = 'device moved';
  }
  knnClassifier.classify(features, function(err, result) {
    if(err){
      console.log(err);
    } else {
      console.log(result); // result.label is the predicted label
      currentClass = result;
    }
  });
}

function getOrientation(){
  // Note: The order the rotations are called is important, ie. if used
  // together, it must be called in the order Z-X-Y or there might be
  // unexpected behaviour.
  if(debug){
    console.log([rotationZ, rotationX, rotationY]);
    debugString = [rotationZ, rotationX, rotationY];
  }
  return [rotationZ, rotationX, rotationY];
}

// Update the example count for each label
function updateCounts() {
  const counts = knnClassifier.getCountByLabel();


  select('#exampleRock').html(counts['Rock'] || 0);
  select('#examplePaper').html(counts['Paper'] || 0);
  select('#exampleScissor').html(counts['Scissor'] || 0);
}

// Clear the examples in one label
function clearLabel(label) {
  if(debug){
    console.log('clearing label ' + label);
    debugString = 'clearing label ' + label;
  }
  knnClassifier.clearLabel(label);
  updateCounts();
}

// Clear all the examples in all labels
function clearAllLabels() {
  if(debug){
    console.log('clearing all labels');
  }
  knnClassifier.clearAllLabels();
  updateCounts();
}
