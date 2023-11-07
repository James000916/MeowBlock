// Thank you for using MeowBlock!😺

var video = document.getElementsByClassName("video-stream")[0];
if (video) {
  video.addEventListener("timeupdate", function() {
    skipAd();
    removeStaticAds();
  });
}
removeStaticAds();

function skipAd() {
  const videoContainer = document.getElementById("movie_player");
  const skipLock = document.querySelector(".ytp-ad-preview-text")?.innerText;
  const surveyLock = document.querySelector(".ytp-ad-survey")?.length > 0;
  if (videoContainer) {
    const isAd = videoContainer.classList.contains("ad-interrupting") || videoContainer.classList.contains("ad-showing");
    if (isAd && skipLock) {
      video.muted = true;
      video.currentTime = video.duration - 1;
      if (video.paused) {
        video.play();
      }
      const skipButton = document.querySelector(".ytp-ad-skip-button, .ytp-ad-skip-button-modern");
      if (skipButton) {
        skipButton.click();
      }
    } else if (isAd && surveyLock) {
      const skipButton = document.querySelector(".ytp-ad-skip-button, .ytp-ad-skip-button-modern");
      if (skipButton) {
        skipButton.click();
      }
    }
  }
};

function removeStaticAds() {
  const pageAds = [
    ".ytd-companion-slot-renderer", ".ytd-action-companion-ad-renderer", // in-feed video ads
    ".ytd-watch-next-secondary-results-renderer.sparkles-light-cta", ".ytd-unlimited-offer-module-renderer", // similar components
    ".ytp-ad-overlay-image", ".ytp-ad-text-overlay", // deprecated overlay ads
    "div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint", "div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer",
    ".ytd-display-ad-renderer", ".ytd-statement-banner-renderer", ".ytd-in-feed-ad-layout-renderer", // homepage ads
    "div#player-ads.style-scope.ytd-watch-flexy, div#panels.style-scope.ytd-watch-flexy", // sponsors
    ".ytd-banner-promo-renderer", ".ytd-video-masthead-ad-v3-renderer", ".ytd-primetime-promo-renderer", // subscribe for premium & youtube tv ads
    "#masthead-ad", ".ytd-ad-slot-renderer", ".ytd-promoted-sparkles-web-renderer" // others
  ];
  pageAds.forEach((ad) => {
    const elements = document.querySelectorAll(ad);
    elements.forEach((el) => {
      if (el) {
        el.remove();
      }
    });
  });
};