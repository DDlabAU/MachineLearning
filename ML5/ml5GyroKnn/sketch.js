const knnClassifier = ml5.KNNClassifier();
let butTrain1, butTrain2, butReset1, butReset2;
let class1Examples, class2Examples;
let currentClass;
let debug = true;

function setup() {
  createCanvas(windowWidth, windowHeight);

  butTrain1 = createButton('Train class 1');
  butTrain1.position(19, 19);
  butTrain1.touchStarted(function(){
    trainModel(getOrientation(), '1');
  });

  butReset1 = createButton('Reset class 1');
  butReset1.position(19, 39);
  butReset1.touchStarted(function(){
    trainModel(getOrientation(), '1');
  });


  butTrain2 = createButton('Train class 2');
  butTrain2.position(19, 59);
  butTrain2.touchStarted(function(){
    trainModel(getOrientation(), '2');
  })

  butReset2 = createButton('Reset class 2');
  butReset2.position(19, 79);
  butReset2.touchStarted(function(){
    trainModel(getOrientation(), '2');
  });
}

function draw() {
  background(255);

  text(currentClass, 19, 0);
  if(debug){
    console.log(currentClass);
  }
}

function trainModel(features, label){
  knnClassifier.addExample(features, label);
  if(debug){
    console.log('training label ' + label);
  }
}

function deviceMoved(){
  if(debug){
    console.log('device moved')
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
