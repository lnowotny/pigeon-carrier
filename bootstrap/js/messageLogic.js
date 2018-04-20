function sendMessage()
{
}

function saveUserName()
{
    debugger;
    var input = document.getElementById("username");
    sessionStorage.setItem("username", input.value);
    return true;
}

function getUserName()
{
    debugger;
	return sessionStorage.getItem("username");
}