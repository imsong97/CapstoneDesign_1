let webcam;

const btnCamera = document.querySelector(".camera-btn");
const content_w = document.getElementById("contents");

// Load the image model and setup the webcam
async function webcaminit() {
    $('.image-upload-wrap').hide();
    
    // // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();

    w_predict();
    window.requestAnimationFrame(w_loop);
   
    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        const div = document.createElement("div");
        div.id = "d-flex"+i;
        labelContainer.appendChild(div);
    }

    $('.camera-btn').hide();
    $('.file-upload-content').show();
    $('.file-upload-image').hide();
    $('.start-image').hide();
}

async function w_loop() {
    webcam.update(); // update the webcam frame
    w_predict();
    window.requestAnimationFrame(w_loop);
}

// run the webcam image through the image model
async function w_predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model_w.predict(webcam.canvas);
<<<<<<< HEAD
    percentBar(prediction);
=======
    for (let i = 0; i < maxPredictions_w; i++) {
        const percent = ((prediction[i].probability)*100).toFixed(1);
        barWidth = percent + "%";
        labelContainer_w.childNodes[i].innerHTML = 
            "<div class='"+prediction[i].className+"'>" + prediction[i].className + "</div><div class='bar'><div class='percent' style='width:"+barWidth+"'></div></div>"
            + "<span>"+barWidth+"</span>"
    }
>>>>>>> parent of 4e5314f... ui modify
}

btnCamera.addEventListener("click", webcaminit);
