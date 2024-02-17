let model;

//openCvReady is the function that will be executed when the opencv.js file is loaded
function openCvReady() {
  cv["onRuntimeInitialized"] = () => {
    // The variable video extracts the video the video element
    let video = document.getElementById("cam_input"); // video is the id of video tag
    // navigator.mediaDevices.getUserMedia is used to access the webcam
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred! " + err);
      });

    //src and dst holds the source and destination image matrix
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    //gray holds the grayscale image of the src
    let gray = new cv.Mat();
    //cap holds the current frame of the video
    let cap = new cv.VideoCapture(cam_input);
    //RectVector is used to hold the vectors of different faces
    let faces = new cv.RectVector();
    let predictions = "Detecting...";
    //classifier holds the classifier object
    let classifier = new cv.CascadeClassifier();
    let utils = new Utils("errorMessage");
    //crop holds the ROI of face
    let crop = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let dsize = new cv.Size(48, 48);

    // Loading the haar cascade face detector
    let faceCascadeFile = "haarcascade_frontalface_default.xml"; // path to xml
    utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
      classifier.load(faceCascadeFile); // in the callback, load the cascade from file
    });

    //Loading the model with async as loading the model may take few miliseconds
    //The function dont take and return anything
    //the model holds the model
    (async () => {
      model = await tf.loadLayersModel("./model/model.json");
      console.log(model);
    })();

    const FPS = 30;
    // processvideo will be executed recurrsively
    function processVideo() {
      let begin = Date.now();
      cap.read(src);
      src.copyTo(dst);
      cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0); // converting to grayscale
      try {
        classifier.detectMultiScale(gray, faces, 1.1, 3, 0); // detecting the face
        console.log(faces.size());
      } catch (err) {
        console.log(err);
      }
      //iterating over all the detected faces
      for (let i = 0; i < faces.size(); ++i) {
        let face = faces.get(i);
        // filtering out the boxes with the area of less than 45000
        if (face.width * face.height < 40000) {
          continue;
        }
        let point1 = new cv.Point(face.x, face.y);
        let point2 = new cv.Point(face.x + face.width, face.y + face.height);
        // creating the bounding box
        cv.rectangle(dst, point1, point2, [51, 255, 255, 255], 3);
        //creating a rect element that can be used to extract
        let cutrect = new cv.Rect(face.x, face.y, face.width, face.height);
        //extracting the ROI
        crop = gray.roi(cutrect);

        cv.resize(crop, crop, dsize, 0, 0, cv.INTER_AREA);

        //converting the image matrix to a 4d tensor
        const input = tf.tensor4d(crop.data, [1, 48, 48, 1]).div(255);

        //console.log(input)
        //making the prediction and adding the prediction it to the output canvas
        predictions = model.predict(input).dataSync(0);

        console.log(predictions);
        //adding the text above the bounding boxes
        cv.putText(
          dst,
          String(parseInt(predictions)),
          { x: face.x, y: face.y - 20 },
          1,
          3,
          [255, 128, 0, 255],
          4,
        );
      }

      // showing the final output
      cv.imshow("canvas_output", dst);

      let delay = 1000 / FPS - (Date.now() - begin);
      setTimeout(processVideo, delay);
    }
    // schedule first one.
    setTimeout(processVideo, 0);
  };
}
