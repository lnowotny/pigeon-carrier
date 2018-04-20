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