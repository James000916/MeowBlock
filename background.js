const hideAds = async () => {
  await new Promise((resolve, _reject) => {
    const videoContainer = document.getElementById("movie_player");

    const setTimeoutHandler = () => {
      const isAd = videoContainer?.classList.contains("ad-interrupting") || videoContainer?.classList.contains("ad-showing");
      const skipLock = document.querySelector(".ytp-ad-preview-text")?.innerText;
      const surveyLock = document.querySelector(".ytp-ad-survey")?.length > 0;
      const videoPlayer = document.getElementsByClassName("video-stream")[0];

      if (isAd && skipLock) {
        videoPlayer.muted = true;
        videoPlayer.currentTime = videoPlayer.duration - 1;
        videoPlayer.paused && videoPlayer.play()
        document.querySelector(".ytp-ad-skip-button")?.click();
        document.querySelector(".ytp-ad-skip-button-modern")?.click();
      } else if (isAd && surveyLock) {
        document.querySelector(".ytp-ad-skip-button")?.click();
        document.querySelector(".ytp-ad-skip-button-modern")?.click();
      }

      resolve();
    };

    setTimeout(setTimeoutHandler, 100);
  });

  hideAds();
};