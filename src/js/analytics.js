(function () {
    window._uxa = window._uxa || [];

    var trafficMediumPattern;
    var trafficCampaignPattern;
    var trafficSourcePattern;
    var campaignGclid;

    if(document.location.search!=''){
    //Please change the URL strings below to choose your traffic parameters
      var mediumParName = 'utm_medium';
      var campaignParName = 'utm_campaign';
      var sourceParName = 'utm_source';
      var regPattern = '=([a-zA-Z0-9\-\_]+)';
      //Variable regPattern is limited to the regex defined above, anything else will be missed
      trafficMediumPattern = new RegExp(mediumParName+regPattern);
      trafficMediumPattern = trafficMediumPattern.exec(document.location.search);

      trafficCampaignPattern = new RegExp(campaignParName+regPattern);
      trafficCampaignPattern = trafficCampaignPattern.exec(document.location.search);

      trafficSourcePattern = new RegExp(sourceParName+regPattern);
      trafficSourcePattern = trafficSourcePattern.exec(document.location.search);

      campaignGclid = new RegExp('gclid=([a-zA-Z0-9\-\_]+)');
      campaignGclid = campaignGclid.exec(document.location.search);
    }
  try {
    //Please edit key strings below to work with parameters defined above (if desired)
        if (trafficMediumPattern !== null && typeof trafficMediumPattern !== 'undefined') {
            if (typeof trafficMediumPattern[1] !== 'undefined'){
                window._uxa.push(["trackDynamicVariable", {key: 'Medium', value: trafficMediumPattern[1].toLowerCase()} ]);
            }
        }
        if (trafficCampaignPattern !== null && typeof trafficCampaignPattern !== 'undefined') {
            if (typeof trafficCampaignPattern[1] !== 'undefined'){
                window._uxa.push(["trackDynamicVariable", {key: 'Campaign', value: trafficCampaignPattern[1].toLowerCase()} ]);
            }
        }
        if (trafficSourcePattern !== null && typeof trafficSourcePattern !== 'undefined') {
            if (typeof trafficSourcePattern[1] !== 'undefined'){
                window._uxa.push(["trackDynamicVariable", {key: 'Source', value: trafficSourcePattern[1].toLowerCase()} ]);
            }
        }
        if (campaignGclid !== null && typeof campaignGclid !== 'undefined') {
            if (typeof campaignGclid[1] !== 'undefined'){
            window._uxa.push(["trackDynamicVariable", {key: 'Gclid', value: 'true'} ]);
            }
        }
        //Add any custom variables here
    }
    catch(e){}
      if (typeof CS_CONF === 'undefined') {
        window._uxa.push(['setPath', window.location.pathname+window.location.hash.replace('#','?__')]);
        var mt = document.createElement("script"); mt.type = "text/javascript"; mt.async = true;
        mt.src = "//t.contentsquare.net/uxa/296dc6b052bf3.js";
        document.getElementsByTagName("head")[0].appendChild(mt);
        } else {
          window._uxa.push(['trackPageview', window.location.pathname+window.location.hash.replace('#','?__')]);
        }
})();