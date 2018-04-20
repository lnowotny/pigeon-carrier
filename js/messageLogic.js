function sendMessage()
{
}

function saveUserName()
{
    var input = document.getElementById("username");
    sessionStorage.setItem("username", input.value);
    return true;
}

function getUserName()
{
	return sessionStorage.getItem("username");
}

function initializeSendMessageForm(sendMessageForm)
{
    debugger;
    var userName = getUserName();
    document.getElementById("from").value = userName;
}