async function show_alert_danger(message) {
    document.getElementById("alert").insertAdjacentHTML("beforeend",
    "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">" 
    + message + 
    "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>")
  }


let form_element = document.getElementById("name_form")

async function hello_user(user_credentials) {
    document.getElementById("greeting_placeholder").innerText = "Привіт, " + user_credentials['email'] // user_credentials["first_name"] + " " + user_credentials["last_name"]
}

async function hello_user_again(user_credentials) {
    document.getElementById("greeting_placeholder").innerText = "Вже бачились, " + user_credentials['email']// user_credentials["first_name"] + " " + user_credentials["last_name"]
}

form_element.addEventListener("submit", async (event) => {
    event.preventDefault()
    console.log('Start')
    let formData = new FormData(event.target)
    object = Object.fromEntries(formData.entries())
    let user_credentials = { "first_name": object["first_name"],
                             "last_name": object["last_name"],
                             "email": object["email"]}
    console.log(localStorage.getItem('cached_user_credentials'))
    let cached_user_credentials = JSON.parse(localStorage.getItem('cached_user_credentials'))
    if (!cached_user_credentials) {
        cached_user_credentials = []
    } else {
        // cached_user_credentials = JSON.parse(cached_user_credentials)
    }
    for (const cached_user of cached_user_credentials) {
        if (cached_user['email'] == user_credentials['email']) {
            await hello_user_again(cached_user)
            return 
        }
    }
    let user_credentials_json = JSON.stringify(user_credentials)
    let response = await fetch(document.URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRFToken': object["csrfmiddlewaretoken"]
        },
        body: user_credentials_json
    })
    const res_json = await response.json()
    if (response.status === 409) {
        hello_user_again(user_credentials)
    }
    else if (response.status === 200) {
        hello_user(user_credentials)
    }
    else {
        await show_alert_danger(res_json["error"])
        return
    }
    console.log(cached_user_credentials)
    cached_user_credentials.push(user_credentials)
    localStorage.setItem('cached_user_credentials', JSON.stringify(cached_user_credentials))

})

