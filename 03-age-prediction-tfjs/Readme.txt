Introduction:
This is an age detection model that can detect age of a person on live steam.Age detection based on human facial appearance have lots of potential real life applications, such as customer service systems, personalized advertisement, and entertainment. 

Requirements:
Web browser, active internet connection, webcam, nodejs, tfjs-node, csvtojson, numpy, pandas, seaborn, scikit-learn

to install requirements:
    npm i @tensorflow/tfjs-node
    npm i csvtojson
    pip install numpy pandas seaborn scikit-learn notebook

Dataset link:
https://www.kaggle.com/nipunarora8/age-gender-and-ethnicity-face-data-csv

Content:
1. /model: This directory contains the model and the weights.
2. /dataset: It contains the train, test and validation dataset.
3. /model architecture: Contains the image of the model architecture
4. /js: holds the opencv.js file
5. index.html : The html file 
6. script.js : The js file required to perform the age detection 
7. train.js :The js file to be executed to train the model.

Flow of Execution:

For training:
First of all, run the Data_prep.ipynb which splits the data into train and validation splits

On executing train.js, it will fetch the train and validation data and convert it to tensors of required dimensions. Then it will train the model using adam optimizer and meanSquaredError as the loss. Model will get saved after each epoch to the model directory, that can be used in the script.js.
NOTE: Local server must be switched on in order to fetch the datasets.

Initialize the local server, and run the HTML file. We create a video element and canvas element such that they overlap each other. Now we access the webcam and capture the real time video. Then we convert it to an image matrix. We reduce the dimension by converting the image to grayscale and then resize the image according to the model. The model takes the grayscale image as the input and results the predicted age of the person which is displayed on the canvas.
 
How to execute:
To execute the program, create a local server or use VSCode server and execute the index.html files and provide the permission to the browser to access the webcam. 

To train:
Execute the following command in terminal(open the train.js in node environment). Don’t forget to create a local server:
“node train.js”

Further Improvements:
The model is trained on the cropped images of the persons so using the model without any face detection technique might result in poor accuracy.