// URLs to check
var websites = [
  'Website_URL',
  '2nd_Website_URL',
  '3rd_Website_URL',
  'Etc...'
];

// Insert Google Sheet ID here
var sheetID= 'Google_Sheet_ID';

// Maximum attempts to make if an error is encountered
var maxAttempts = 3;

// Sleep duration between attempts (in milliseconds)
var sleepDuration = 10000; // 10 seconds

function checkPageSpeed() {
  // Get the specific sheet by ID
  var sheet = SpreadsheetApp.openById(sheetID).getActiveSheet();
  
  for (var i = 0; i < websites.length; i++) {
    var url = websites[i];
    console.info("Checking site: " + url);
    
    for (var attempt = 1; attempt <= maxAttempts; attempt++) {
      console.info("Attempt number: " + attempt);
      
      try {
        console.info("Fetching data from PageSpeed API for site: " + url);
        var response = UrlFetchApp.fetch("https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" + url);
        var json = JSON.parse(response.getContentText());
        
        console.info("Response received for site: " + url);
        console.info("Parsing PageSpeed data");
        
        var pageSpeedData = parsePageSpeedData(json);
        console.info("Data parsed successfully. Prepending URL and timestamp to the data.");
        
        pageSpeedData.unshift(new Date()); // prepend timestamp
        pageSpeedData.unshift(url); // prepend url
        
        console.info("Data prepped, appending to sheet.");
        
        // Append data to sheet
        sheet.appendRow(pageSpeedData);
        console.info("Data appended to sheet successfully. Moving to the next site if any.");
        
        // Break the retry loop as the request was successful
        break;
      } catch (e) {
        console.error("Error encountered: " + e.message);
        console.info("Retrying after 10 seconds...");
        Utilities.sleep(sleepDuration);
      }
    }
  }
}
function parsePageSpeedData(json) {
  console.info("Begin parsing individual PageSpeed metrics.");

  var strategy = json.lighthouseResult.configSettings.emulatedFormFactor;
  console.info("Strategy: " + strategy);
  
  var mainScore = json.lighthouseResult.categories.performance.score;
  console.info("Main score: " + mainScore);

  var metrics = json.lighthouseResult.audits.metrics.details.items[0];
  
  var fcp = metrics.firstContentfulPaint || "N/A";
  console.info("First Contentful Paint: " + fcp);

  var si = metrics.speedIndex || "N/A";
  console.info("Speed Index: " + si);

  var lcp = metrics.largestContentfulPaint || "N/A";
  console.info("Largest Contentful Paint: " + lcp);

  var tti = metrics.interactive || "N/A";
  console.info("Time to Interactive: " + tti);

  var tbt = metrics.totalBlockingTime || "N/A";
  console.info("Total Blocking Time: " + tbt);

  var cls = metrics.cumulativeLayoutShift || "N/A";
  console.info("Cumulative Layout Shift: " + cls);

  var srt = metrics.serverResponseTime || "N/A";
  console.info("Server Response Time: " + srt);

  var fmp = metrics.firstMeaningfulPaint || "N/A";
  console.info("First Meaningful Paint: " + fmp);

  var ttfb = metrics.timeToFirstByte || "N/A";
  console.info("Time to First Byte: " + ttfb);

  var performanceScore = json.lighthouseResult.categories.performance.score * 100;
  console.info("Performance Score in Percentage: " + performanceScore);

  var accessibilityScore = json.lighthouseResult.categories.accessibility ? json.lighthouseResult.categories.accessibility.score * 100 : "N/A";
  console.info("Accessibility Score in Percentage: " + accessibilityScore);

  var bestPracticesScore = json.lighthouseResult.categories['best-practices'] ? json.lighthouseResult.categories['best-practices'].score * 100 : "N/A";
  console.info("Best Practices Score in Percentage: " + bestPracticesScore);

  var seoScore = json.lighthouseResult.categories.seo ? json.lighthouseResult.categories.seo.score * 100 : "N/A";
  console.info("SEO Score in Percentage: " + seoScore);
  
  console.info("End parsing individual PageSpeed metrics.");
  
  return [
    strategy,
    performanceScore,
    accessibilityScore,
    bestPracticesScore,
    seoScore,
    mainScore,
    fcp,
    si,
    lcp,
    tti,
    tbt,
    cls,
    srt,
    fmp,
    ttfb
  ];
}
