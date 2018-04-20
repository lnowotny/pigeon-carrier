function initializeSendMessageForm(sendMessageForm)
{
    var userName = getUserName();
    document.getElementById("from").value = userName;
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

    var messages = [];
    var previousMessagesJson = localStorage.getItem("carrier-pigeon-history");
    if (previousMessagesJson)
    {
        messages = JSON.parse(previousMessagesJson);
    }

    messages.push(message);

    var messagesString = JSON.stringify(messages);
    localStorage.setItem("carrier-pigeon-history", messagesString);
}