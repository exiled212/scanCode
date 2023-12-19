const SONAR_USERNAME = process.env.SONAR_USERNAME;
const SONAR_INIT_PASSWORD = process.env.SONAR_INIT_PASSWORD;
const SONAR_PASSWORD = process.env.SONAR_PASSWORD;
const SONAR_HOST_URL = process.env.SONAR_HOST_URL;


validateUser(SONAR_USERNAME, SONAR_INIT_PASSWORD)
    .then(res => {
        if(res.ok){
            console.error("Updating user")
            updateUser(SONAR_USERNAME, SONAR_INIT_PASSWORD, SONAR_PASSWORD)
        }else{
            console.error("User is updated")
        }
    })


async function updateUser(user, password, newPassword){
    const URL = `${SONAR_HOST_URL}/api/users/change_password?login=${user}&previousPassword=${password}&password=${newPassword}`
    return fetch(URL, {
        method: 'POST',
        mode: "cors",
        headers: {
            "Authorization": buildToken(user, password)
        }
    })
    .then(res => res)
    .catch(err => console.error(err));
}

async function validateUser(user, password){
    const URL = `${SONAR_HOST_URL}/api/authentication/login?login=${user}&password=${password}`
    return fetch(URL, {
        method: 'POST',
        mode: "cors",
        headers: {
            "Authorization": buildToken(user, password)
        }
    })
    .then(res => res)
    .catch(err => console.error(err));
}

function buildToken(user, password){
    return "Basic " + Buffer.from(user+":"+password).toString('base64')
}