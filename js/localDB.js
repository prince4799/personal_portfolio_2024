
function getfromSession(...key_names) {
    const key = key_names.join('');
    return sessionStorage.getItem(key);
}


function setInSession(key_name, value) {
    return sessionStorage.setItem(key_name, value);
}
function removeFromSession(key_name) {
    return sessionStorage.removeItem(key_name);
}

//sessionStorage.removeItem("key")

function save_skill_card(skillArr) {
    swal("Are you sure you want to add this card", {
        buttons: ["No", "Yes"],
    }).then((value) => {
        log(`The returned value is: ${value}`);
        if (value) {
            CONSTANT.CARD_COUNT=CONSTANT.CARD_COUNT+1;
            let skill = getfromSession("skill_array")
            if(skill){
                skill = skill.concat(',', skillArr)
                removeFromSession("skill_array")
            }else{
                skill=skillArr;
            }
            setInSession('skill_array', skill)
            swal("Card is added successfully", "Now proceed further", "success")
            document.getElementById('form_2').reset();
            var card_after_selection = document.getElementById('skill-card-container-after-selection')
            card_after_selection.style.display = 'none';
            var skill_desc = document.getElementById('about-the-skill')
            skill_desc.disabled = true;
        }
    });



}


function saveInSession() {

    const user_credential = JSON.stringify({
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value,
    });
    //sessionStorage.setItem('key', 'value');
    setInSession('user_credential', user_credential);
    const retrieve = getfromSession('user_credential');
}


function form_1() {
    const name = document.getElementById('Name').value
    setInSession('name', name)
    const domain_arr = [];

    for (i = 1; i <= 5; i++) {
        const input = document.getElementById(`domain-${i}`).value;
        // input.addEventListener('blur', function() {
        if (input.length > 0) {
            domain_arr.push(input)
        }
        //   });
    }
    setInSession('domain', domain_arr)
    const aboutYourself = document.getElementById('aboutYourself').value
    setInSession('about-yourself', aboutYourself)
}


function form_2() {

}

function search_skill() {
    const search_skill = document.getElementById('search-skill');
    setInSession('skill_name', search_skill.value)
    if (search_skill.value.length < 1) {
        alert("Please input the skill name.")
        return;
    }
    search_icon(search_skill.value)
}

