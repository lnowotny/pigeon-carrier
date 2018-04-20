function getMessageHistory()
{
    var previousMessagesJson = localStorage.getItem("carrier-pigeon-history");
    if (previousMessagesJson)
    {
        messages = JSON.parse(previousMessagesJson);
        return messages;
    }
    return [];
}

function initializeSendMessageForm()
{
    var userName = getUserName();
    document.getElementById("from").value = userName;

    var input = document.getElementById('address');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

function initializeMessageHistoryTable()
{
    var table = document.getElementById("sentMessageTable");
    var tableBody = table.getElementsByTagName('tbody')[0];
    var messages = getMessageHistory();
    messages.forEach(function(message) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(message.to));
        tr.appendChild(td);

        td = document.createElement("td");
        var dateObject = new Date(message.timestamp);
        var date = dateObject.toDateString();
        var time = dateObject.toTimeString();
        td.appendChild(document.createTextNode(date + ' ' + time));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(message.content));
        tr.appendChild(td);

        tableBody.appendChild(tr);
    });
}

function sendMessage()
{
    var from = getUserName();

    var message = {};
    message.from = from;
    message.to = document.getElementById("to").value;
    message.address = document.getElementById("address").value;
    message.content = document.getElementById("subject").value;
    message.timestamp = Date.now();

    var messages = getMessageHistory();
    messages.push(message);

    var messagesString = JSON.stringify(messages);
    localStorage.setItem("carrier-pigeon-history", messagesString);
}