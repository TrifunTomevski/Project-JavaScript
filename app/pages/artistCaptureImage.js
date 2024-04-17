const videoElement = document.querySelector("#liveStream");

export function stopStream() {
    const stream = videoElement.srcObject;
    if (!stream) return;

    const allTracks = stream.getTracks();
    allTracks.forEach((track) => track.stop());
}

export function initArtistCaptureImage() {
    // Variables
    const captureStreamCanvas = document.querySelector("#captureStream");
    const captureImageButton = document.querySelector("#captureImage");
    const capturedImage = document.querySelector("#newImageDisplayed");
    const displayCapturedImage = document.querySelector(".imageDisplayedWrap");
    const deleteImageButton = document.querySelector(".trashcanDelete");
    const newItemImageUrlInput = document.querySelector("#imgURLnew");
    const stopStreamBtn = document.querySelector("#stopStream");

    // Stop Stream Button
    stopStreamBtn.addEventListener("click", stopStream);

    function getUserMedia() {
        return navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: "environment" },
            },
        });
    }

    // Canvas
    function displayImageOnCanvas() {
        const ctx = captureStreamCanvas.getContext("2d");
        ctx.drawImage(videoElement, 0, 0);
    }

    // Captured Image Display
    function displayCapturedImageInUI(imgUrl) {
        capturedImage.src = imgUrl;
        newItemImageUrlInput.value = imgUrl;
        location.hash = "#addNewItemPage";
        displayCapturedImage.style.display = "block";
    }

    function clearCapturedImageFromUI() {
        capturedImage.src = "";
        displayCapturedImage.style.display = "none";
    }

    getUserMedia()
        .then((stream) => {
            videoElement.srcObject = stream;
        })
        .catch((err) => {
            console.log(err);
        });

    videoElement.addEventListener("canplay", function () {
        captureStreamCanvas.width = videoElement.videoWidth;
        captureStreamCanvas.height = videoElement.videoHeight;
    });

    // Capture Image Button
    captureImageButton.addEventListener("click", function () {
        displayImageOnCanvas();
        const imgUrl = captureStreamCanvas.toDataURL("image/png");
        displayCapturedImageInUI(imgUrl);
    });

    // Delete Image Trash Button
    deleteImageButton.addEventListener("click", function () {
        clearCapturedImageFromUI();
    });
}
