# websitebooster
Google App Script that speeds up your website performance, by preventing it being put to sleep if it doesn't have traffic. 

Have you ever noticed that your wesbite performance and loadup times are extremely slow the first time you visit the site after a while? This is because alot of shared hosting acompanies put your website to sleep when you dont have enough traffic to make mopre resources available for other sites on the plan. If you confront them about this issue, they will deny it and say the cause is something else. I got fed up so I decided to test out to see if I was receiving constant traffic, would this issue still occur? As you might have guessed, it does not, there is no longer an initial long waiting time when you havent visited the website in a while. I have tested it thoroughly over weeks during my development stage of the website, I've noticed a huge decrease in initial visit time after running my solution.

Basically I am using using google app script and google's pagespeed API "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" to run a page speed test on the website every 5 minutes, and saving the output to a google sheet. You can do this to all your websites by including them in the website variable. It also acts as a constant logger and monitor for your website performance. I can upgrade this later down the line to include sending out a weekly report of the website amongst other things, but for the time being, this just solves a huge problem for me, which is extremely tedious website perfomance on a website, especially if you are using a shared hosting plan and they do the extremely unethical performance degredation that they do. 

**Requirements**
1. A Google Account
2. A blank Google sheet.
3. Insert those headers into the Google sheet on the first row: URL	Time	Strategy	Performance Score (%)	Accessibility Score (%)	Best Practices Score (%)	SEO Score (%)	Main Score	First Contentful Paint	Speed Index	Largest Contentful Paint	Time to Interactive	Total Blocking Time	Cumulative Layout Shift	Server Response Time	First Meaningful Paint	Time to First Byte
4. The Id of the google sheet: this is the section between d/ and /edit. In this sheet for example: https://docs.google.com/spreadsheets/d/113TgSdsk96eJWfSmt1_KxiB1ql8W3D2AEZdIyq0dthk/edit#gid=0 , The id is: 113TgSdsk96eJWfSmt1_KxiB1ql8W3D2AEZdIyq0dthk
5. A website URL or multiple websites URLs

   

**Installation**
1. [Visit the google app scripts homepage.]([url](https://script.google.com/u/0/home/my)https://script.google.com/u/0/home/my)
2. Start a New Project.
3. Erase all contents of the template "Code.gs" and copy the code in the "Website Booster.gs" into the editor instead.
4. Fill out the websites variable with your own websites, you can have as many as you want
5. Save the code by clicking Ctrl + S.
6. Go to the "Triggers" section in the sidebar. Has an Alarm Clock Icon.    <img width="139" alt="image" src="https://github.com/FrostedFlamesTips/websitebooster/assets/67317950/21683920-778c-4d85-9933-d1be6b1a0beb">
7. Click on "Add Trigger" on the bottom right hand corner of the page:
8. Select these options in the same order as they appear:
    Function: "checkPageSpeed"
    Choose which deployment should run: "Head"
    Select event source "Time-driven"
    Select type of time based trigger: "Minutes timer"
    Select minute interval: "Every 5 minutes", through testing I found this to be the best option.
    Failure notification settings: "Notify me immediately", you can set this however you like but I like to be notified immediately if thers any error as through this I would      know the website is down.
9. Enjoy!
   



