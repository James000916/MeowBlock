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

      const staticAds = [
        ".ytd-companion-slot-renderer", ".ytd-action-companion-ad-renderer", // in-feed video ads
        ".ytd-watch-next-secondary-results-renderer.sparkles-light-cta", ".ytd-unlimited-offer-module-renderer", // similar components
        ".ytp-ad-overlay-image", ".ytp-ad-text-overlay", // deprecated overlay ads
        "div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint", "div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer",
        ".ytd-display-ad-renderer", ".ytd-statement-banner-renderer", ".ytd-in-feed-ad-layout-renderer", // homepage ads
        "div#player-ads.style-scope.ytd-watch-flexy, div#panels.style-scope.ytd-watch-flexy", // sponsors
        ".ytd-banner-promo-renderer", ".ytd-video-masthead-ad-v3-renderer", ".ytd-primetime-promo-renderer", // subscribe for premium & youtube tv ads
        "#masthead-ad", ".ytd-ad-slot-renderer", ".ytd-promoted-sparkles-web-renderer" // others
      ];

      staticAds.forEach((ad) => {
        document.hideElementsBySelector(ad);
      });

      resolve();
    };

    setTimeout(setTimeoutHandler, 100);
  });

  hideAds();
};

const init = async () => {
  Document.prototype.hideElementsBySelector = (selector) =>
    [...document.querySelectorAll(selector)].forEach((el) => 
      (el.remove())
    );

    hideAds();
};

init();