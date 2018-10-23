var OneSignal = {};

OneSignal.info = null;

OneSignal.getPlayerId = function() {
	if(OneSignal.info != null) {
		return OneSignal.info.playerid;	
	} else {
		return null;
	}
};

OneSignal.getPushToken = function() {
	if(OneSignal.info != null) {
		return OneSignal.info.pushToken;	
	} else {
		return null;
	}
};

OneSignal.getInfo = function() {
	if(OneSignal.info != null) {
		return {'playerid':OneSignal.getPlayerId()};	
	} else {
		return null;
	}
};