"use strict";
var News = /** @class */ (function () {
    function News() {
        this.Title = "";
        this.Description = "";
        this.PublishedAt = "";
    }
    News.GetNews = function () {
        var ToReturn = [];
        //News 6
        var n6 = new News();
        n6.Title = "Insider Trading API Article";
        n6.Description = "New article detailing how the insider trading service works, key features, and how to get started: <a href=\"/article/index.html?id=insider-trading-api\">Aletheia's Insider Trading API.</a>";
        n6.PublishedAt = "JULY 6, 2021";
        ToReturn.push(n6);
        //News 5
        var n5 = new News();
        n5.Title = "Introducing the Insider Trading Webhook";
        n5.Description = "The Insider Trading Webhook is now publicly available! Check it out here: <a href=\"/article/index.html?id=introducing-insider-trading-webhook\">Introducing Aletheia's Insider Trading Webhook</a>";
        n5.PublishedAt = "JULY 1, 2021";
        ToReturn.push(n5);
        //News 4
        var n4 = new News();
        n4.Title = "Official pricing page now available";
        n4.Description = "Check out our <a href=\"/pricing/\">official pricing page.</a>";
        n4.PublishedAt = "JUNE 3, 2021";
        ToReturn.push(n4);
        //News 3
        var n3 = new News();
        n3.Title = "Usage metric endpoints now available";
        n3.Description = "Developers can now monitor their consumption of the Aletheia API service with the <a href=\"/docs/#consumption\">Consumption</a> and <a href=\"/docs/#my-calls\">My Calls</a> endpoints.";
        n3.PublishedAt = "MAY 21, 2021";
        ToReturn.push(n3);
        //News 2
        var n2 = new News();
        n2.Title = "'Send daily stock performance update' Power Automate template published";
        n2.Description = "Check out our new Power Automate template to learn how to send a daily stock performance to yourself: <a href=\"https://flow.microsoft.com/en-us/galleries/public/templates/37c22a34d3c1433799e74b4ce6c86834/send-daily-stock-performance-update/\">Send daily stock performance update</a>";
        n2.PublishedAt = "MAY 19, 2021";
        ToReturn.push(n2);
        //News 1
        var n1 = new News();
        n1.Title = "Fundamentals-based endpoints now available in Power Apps and Power Automate";
        n1.Description = "Users of Microsoft's Power Platform can now leverage the <a href=\"/docs/#common-financials\">Common Financials</a> and <a href=\"/docs/#financial-fact-trend\">Financial Fact Trend</a> endpoints with the <a href=\"https://docs.microsoft.com/en-us/connectors/aletheia/#get-financial-fact-trend\">Get Financial Fact Trend</a> and <a href=\"https://docs.microsoft.com/en-us/connectors/aletheia/#get-common-financials\">Get Common Financials</a> actions in their Power Apps and Power Automate flows.";
        n1.PublishedAt = "MAY 11, 2021";
        ToReturn.push(n1);
        return ToReturn;
    };
    News.prototype.InjectIntoHtmlElement = function (element_id) {
        var ele = document.createElement("div");
        ele.classList.add("news");
        //Title
        var ele_title = document.createElement("p");
        ele_title.classList.add("whats-new-title");
        ele_title.innerHTML = this.Title;
        ele.append(ele_title);
        //Description
        var ele_description = document.createElement("p");
        ele_description.classList.add("whats-new-desc");
        ele_description.innerHTML = this.Description;
        ele.append(ele_description);
        //Published at
        var ele_publishedat = document.createElement("p");
        ele_publishedat.classList.add("whats-new-date");
        ele_publishedat.innerHTML = this.PublishedAt;
        ele.append(ele_publishedat);
        //Add the element to the container on the page
        var cont = document.getElementById(element_id);
        cont.append(ele);
    };
    return News;
}());
