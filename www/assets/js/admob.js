function onDeviceReady() {
  document.removeEventListener('deviceready', onDeviceReady, false);

  // Set AdMobAds options:
  admob.setOptions({
	publisherId:          "ca-app-pub-8597358551901146/4544804049",  // Required
	interstitialAdId:     "ca-app-pub-8597358551901146/8975003642"  // Optional
	//tappxIdiOS:           "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
	//tappxIdAndroid:       "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
	//tappxShare:           0.5                                        // Optional
  });

  // Start showing banners (atomatic when autoShowBanner is set to true)
  admob.createBannerView();

  // Request interstitial (will present automatically when autoShowInterstitial is set to true)
  //admob.requestInterstitialAd();
}

document.addEventListener("deviceready", onDeviceReady, false);

function loadAds(){}