var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var searchInput = document.getElementById("search");
var inputs = document.getElementsByClassName("form-control");
var sites = [];
var indexElement = undefined;


if(localStorage.getItem("ourSites") != null)
{
    sites = JSON.parse(localStorage.getItem("ourSites"));
    display();
}

function addSite()
{

    if(document.getElementById("mainBtn").innerHTML == "SUBMIT")
    {
        var site = {
            name: nameInput.value,
            url: urlInput.value
        }
    
        sites.push(site);
        localStorage.setItem("ourSites",JSON.stringify(sites));
        display();
        clear();
    }
    else {
        sites[indexElement].name = nameInput.value;
        sites[indexElement].url = urlInput.value;
        localStorage.setItem("ourSites",JSON.stringify(sites));
        display();
        clear();
        document.getElementById("mainBtn").innerHTML = "SUBMIT";

    }
    
}

function clear()
{
    for (var i = 0; i < inputs.length; i++)
    {
        inputs[i].value = "";
    }
}

function display()
{
    var trs = "";

    for(var i = 0; i < sites.length; i++)
    {
        trs += `<tr>
                <td>${sites[i].name}</td>
                <td><button class="btn btn-primary"><a href="${sites[i].url}" target="_blank">Visit</a></button></td>
                <td><button onclick="deleteElement(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="update(${i})" class="btn btn-warning">Update</button></td>
                </tr>`;
    }

    document.getElementById("display-table").innerHTML = trs;
}

function deleteElement(index)
{
    for (var i = 0; i < sites.length; i++)
    {
        if(sites[i] == sites[index])
        {
            sites.splice(index, 1);
        }
    }
    localStorage.setItem("ourSites",JSON.stringify(sites));
    display();
}

function search()
{
    var trs = "";
    for (var i = 0; i < sites.length; i++)
    {
        if(sites[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
        {
            
            trs += `<tr>
                <td>${sites[i].name}</td>
                <td><button class="btn btn-primary"><a href="${sites[i].url}" target="_blank">Visit</a></button></td>
                <td><button onclick="deleteElement(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="update(${i})" class="btn btn-warning">Update</button></td>
                </tr>`;
        }  
    }
    document.getElementById("display-table").innerHTML = trs;

}

function update(index)
{
    indexElement = index;
    console.log(indexElement);
    nameInput.value = sites[index].name;
    urlInput.value = sites[index].url;

    document.getElementById("mainBtn").innerHTML = "UPDATE";
}

nameInput.onkeyup=function(){
    var nameRejex=/^[A-Z][a-z]{2,8}$/
    if(!nameRejex.test(nameInput.value))
    {
        mainBtn.disabled="true";
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        nameAlert1.classList.remove("d-none");
        return false;
    }
    else{
        mainBtn.removeAttribute("disabled");
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        nameAlert1.classList.add("d-none");
        return true

    }
   
}


urlInput.onkeyup=function(){
    var urlRejex=/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/
    if(!urlRejex.test(urlInput.value))
    {
        mainBtn.disabled="true";
        urlInput.classList.add("is-invalid");
        urlInput.classList.remove("is-valid");
        nameAlert2.classList.remove("d-none");
        return false;

    }
    else{
        mainBtn.removeAttribute("disabled");
        urlInput.classList.add("is-valid");
        urlInput.classList.remove("is-invalid");
        nameAlert2.classList.add("d-none");
        return true

    }
   
}