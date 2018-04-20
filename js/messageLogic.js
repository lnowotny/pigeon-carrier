function sendMessage()
{
}

function initializeSendMessageForm(sendMessageForm)
{
    debugger;
    var userName = getUserName();
    document.getElementById("from").value = userName;

    var input = document.getElementById('address');
    var autocomplete = new google.maps.places.Autocomplete(input);
}