//--------------GLOBAL VARIABLES----------------
var co_CIK = "";
var co_TradingSymbol = "";
var co_Name = "";


////////////////////////////////////////////////

//Get the CIK from the URL
var qs = window.location.search;
var sp = new URLSearchParams(qs);
var CO_ID = sp.get("cik");

//Plug in the company name
var cnreq = new XMLHttpRequest();
cnreq.open("get", "https://aletheia.azurewebsites.net/api/GetCompany?id=" + CO_ID);
cnreq.onreadystatechange = function()
{
    if (cnreq.readyState == 4 && cnreq.status == 200)
    {
        var co_obj = JSON.parse(cnreq.responseText);
        var CIK = co_obj.CIK;
        var TradingSymbol = co_obj.TradingSymbol;
        var Name = co_obj.Name;

        //Set the global variables
        co_CIK = CIK;
        co_TradingSymbol = TradingSymbol;
        co_Name = Name;

        document.getElementById("company-title").innerText = Name + " (" + TradingSymbol + ")";
        document.getElementById("company-cik").innerText = "CIK " + CIK;
    }
    else if (cnreq.readyState == 4 && cnreq.status != 200)
    {
        window.alert("Unable to find company with CIK or Trading Symbol \"" + CO_ID + "\".");
    }
}
cnreq.send();



function ReqTransactions(id)
{
    //The "id" parameter
    //0 = all transactions
    //1 = buys
    //2 = sells

    //Is the "Equity Only" checkbox checked?
    var eq_only_component = "";
    if (document.getElementById("equityOnly").checked == true)
    {
        eq_only_component = "&securitytype=0";
    }
    
    //Get the transaction type part (i.e. buys only or sells only)
    var tt_component = "";
    if (id == 1) //Buys only
    {
        tt_component = "&transactiontype=0";
    }
    else if (id == 2) //Sells only
    {
        tt_component = "&transactiontype=1";
    }

    var url = "https://aletheia.azurewebsites.net/api/LatestTransactions?entity=0&cik=" + CO_ID + "&top=10" + eq_only_component + tt_component;
    var req = new XMLHttpRequest();
    req.open("get", url);
    req.onreadystatechange = function()
    {
        if (req.readyState == 4 && req.status == 200)
        {
            //Clear the contents of the list view
            document.getElementById("results-list-cont").innerHTML = "";

            //Add each
            var results = JSON.parse(req.responseText);
            results.forEach(AddTransactionToList);
            
            //Hide loading, show transactions
            HideLoading();
            ShowTransactionsList();
        }
    }

    //Hide the list, show the loading pane
    ShowLoading();
    HideTransactionsList();

    //Send it!
    req.send();
}

function AddTransactionToList(transaction)
{
    var ele = document.createElement("div");
    ele.classList.add("security-transaction");

    //Date
    var ele_date = document.createElement("div");
    ele_date.classList.add("st-col");
    ele_date.classList.add("st-col1");
    var dt = new Date(transaction.TransactionDate);
    ele_date.innerText = dt.getMonth() + "/" + dt.getDay() + "/" + dt.getFullYear();
    ele.appendChild(ele_date);

    //Name
    var ele_name = document.createElement("div");
    ele_name.classList.add("st-col");
    ele_name.classList.add("st-col2");
    var personname = transaction.OwnedBy.FullName;
    if (personname.length > 13)
    {
        personname = personname.substring(0, 13) + "...";
    }
    ele_name.innerText = personname;
    ele.appendChild(ele_name);

    //Security
    var ele_securitytype = document.createElement("div");
    ele_securitytype.classList.add("st-col");
    ele_securitytype.classList.add("st-col3");
    var security_type_val = transaction.SubjectSecurity.SecurityType;
    var security_type_str = "";
    if (security_type_val == 0)
    {
        security_type_str = "Equity"
    }
    else if (security_type_val == 1)
    {
        security_type_str = "Derivative";
    }
    else
    {
        security_type_str = "?";
    }
    ele_securitytype.innerText = security_type_str;
    ele.appendChild(ele_securitytype);

    //Transaction type
    var ele_transactiontype = document.createElement("div");
    ele_transactiontype.classList.add("st-col");
    ele_transactiontype.classList.add("st-col4");
    var transcode = transaction.TransactionCode;
    var trans_str = "";
    if (transcode == 0)
    {
        trans_str = "Purchase";
    }
    else if (transcode == 1)
    {
        trans_str = "Sale";
    }
    else if (transcode == 2)
    {
        trans_str = "Early Report";
    }
    else if (transcode == 3)
    {
        trans_str = "Grant";
    }
    else if (transcode == 4)
    {
        trans_str = "Sale to Company";
    }
    else if (transcode == 5)
    {
        trans_str = "Payment of Tax";
    }
    else if (transcode == 6)
    {
        trans_str = "Discretionary";
    }
    else if (transcode == 7)
    {
        trans_str = "Derivative Conv";
    }
    else if (transcode == 8)
    {
        trans_str = "Derivative Conv";
    }
    else if (transcode == 9)
    {
        trans_str = "Derivative Expiration";
    }
    else if (transcode == 10)
    {
        trans_str = "Derivative Expiration";
    }
    else if (transcode == 11)
    {
        trans_str = "Derivative Excercise";
    }
    else if (transcode == 12)
    {
        trans_str = "Derivative Excercise";
    }
    else if (transcode == 13)
    {
        trans_str = "Gift";
    }
    else if (transcode == 14)
    {
        trans_str = "Small Acq";
    }
    else if (transcode == 15)
    {
        trans_str = "Disposition";
    }
    else if (transcode == 16)
    {
        trans_str = "Trust Deposit";
    }
    else if (transcode == 17)
    {
        trans_str = "Other";
    }
    else if (transcode == 18)
    {
        trans_str = "Equity Swap";
    }
    ele_transactiontype.innerText = trans_str;
    ele.appendChild(ele_transactiontype);

    //Title
    var ele_securitytitle = document.createElement("div");
    ele_securitytitle.classList.add("st-col");
    ele_securitytitle.classList.add("st-col5");
    var securitytitle = transaction.SubjectSecurity.Title;
    if (securitytitle.length > 15)
    {
        securitytitle = securitytitle.substring(0, 15) + "...";
    }
    ele_securitytitle.innerText = securitytitle;
    ele.appendChild(ele_securitytitle);

    //Quantity
    var ele_quantity = document.createElement("div");
    ele_quantity.classList.add("st-col");
    ele_quantity.classList.add("st-col6");
    ele_quantity.innerText = transaction.Quantity;
    ele.appendChild(ele_quantity);

    //Select button
    var ele_select = document.createElement("div");
    ele_select.classList.add("st-col");
    ele_select.classList.add("st-col7");
    ele_select.innerText = "+";
    ele.appendChild(ele_select);

    //Now add the element to the list
    document.getElementById("results-list-cont").appendChild(ele);
}


//     Show/Hide transactions below
function ShowLoading()
{
    document.getElementById("recent-transactions-loading-pane").classList.remove("hidden");
    document.getElementById("recent-transactions-loading-txt").classList.remove("hidden");
}

function HideLoading()
{
    document.getElementById("recent-transactions-loading-pane").classList.add("hidden");
    document.getElementById("recent-transactions-loading-txt").classList.add("hidden");
}

function ShowTransactionsList()
{
    document.getElementById("results-list-cont").classList.remove("hidden");
}

function HideTransactionsList()
{
    document.getElementById("results-list-cont").classList.add("hidden");
}