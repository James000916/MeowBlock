// Thank you for using MeowBlock!😺

const hideAds = async () => {
  const response = await fetch('https://james000916.github.io/MeowBlock/variables.json');
  const variables = await response.json();

  await new Promise((resolve, reject) => {
    const videoContainer = document.getElementById(variables.videoContainer);

    const setTimeoutHandler = () => {
      const isAd = videoContainer?.classList.contains(variables.isAdClass1) || videoContainer?.classList.contains(variables.isAdClass2);
      const videoPlayer = document.getElementsByClassName(variables.videoPlayer)[0];
      const surveyLock = document.querySelector(variables.surveyLock)?.length > 0;
      const skipLock = document.querySelector(variables.skipLock)?.innerText;
      const skipLockModern = document.querySelector(variables.skipLockModern)?.innerText;
      const skipButton = document.querySelector(variables.skipButton);
      const skipButtonModern = document.querySelector(variables.skipButtonModern);

      if ((isAd && skipLock) || (isAd && skipLockModern)) {
        videoPlayer.muted = true;
        videoPlayer.currentTime = videoPlayer.duration - 0.1;
        videoPlayer.play();
        skipButton?.click();
        skipButtonModern?.click();
      } else if (isAd && surveyLock) {
        skipButton?.click();
        skipButtonModern?.click();
      }

      const staticAds = variables.staticAds;
      staticAds.forEach((ad) => {
        document.removeAdElements(ad);
      });

      resolve();
    };

    setTimeout(setTimeoutHandler, 100);
  });

  hideAds();
};

const init = async () => {
  Document.prototype.removeAdElements = (selector) =>
    [...document.querySelectorAll(selector)].forEach((el) => 
      (el.remove())
    );

    hideAds();
};

init();