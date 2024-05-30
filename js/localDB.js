


function saveInSession() {

    const user_credential = JSON.stringify({
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value,
    });
    //sessionStorage.setItem('key', 'value');
    setInSession('user_credential', user_credential);
    const retrieve = getfromSession('user_credential');
}

//sessionStorage.removeItem("key")

//======================== SKILL SECTION   =======================

function form_1() {
    const name = document.getElementById('Name').value
    setInSession('name', name)
    const _name=getfromSession("name");
    console.log("_name",_name)
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

function save_skill_card(skillArr) {
    swal("Are you sure you want to add this card", {
        buttons: ["No", "Yes"],
    }).then((value) => {
        log(`The returned value is: ${value}`);
        if (value) {
            CONSTANT.SKILL_CARD_COUNT = CONSTANT.SKILL_CARD_COUNT + 1;
            let skill = getfromSession("skill_array")
            if (skill) {
                skill = skill.concat(',', skillArr)
                removeFromSession("skill_array")
            } else {
                skill = skillArr;
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

function search_skill() {
    const search_skill = document.getElementById('search-skill');
    // setInSession('skill_name', search_skill.value)
    if (search_skill.value.length < 1) {
        alert("Please input the skill name.")
        return;
    }
    search_icon(search_skill.value)
}

// function saveBasicDetails(){
//     console.log("====>");
//     // const name =document.getElementById('Name');
//     // // const domains_fields=document.getElementsByClassName('domain-feilds')
//     // const domain_arr=[]
//     // for(let i=1;i<6;i++){
//     //     const domains=document.getElementById(`domain-${i}`).value
//     //     if(domains!=null && domains!='' || domains!=undefined)
//     //         log("domain name is ",domains)
//     // }
// }

//======================== PROJECT SECTION =======================
function form_2() {
    const form = document.getElementById('form_3')
    const project_name = document.getElementById('project-name-form')
    const project_title = document.getElementById('project-title')
    const project_thumbnail = document.getElementById('project-form-thumbnail')
    const project_img_input = document.getElementById('project-image-url')
    const project_desription_input = document.getElementById('about-the-project-form')
    const project_description = document.getElementById('project-form-description')
    const project_form_tech = document.getElementsByClassName('project-tech-name-form')
    project_img_input.addEventListener('input', () => {


        if (project_img_input.value != '' && project_img_input.value != null && project_img_input.value != undefined) {
            // var request = new XMLHttpRequest();
            // request.open("GET", project_img_input.value + '', true);
            // request.send();
            // request.onload = function () {
            //     status = request.status;

            //     if (request.status == 200) //if(statusText == OK)
            //     {
            //         project_thumbnail.src = project_img_input.value + ''
            //         project_name.disabled = false
            //         project_desription_input.disabled = false;
            //         // project_form_tech.foreach(element=>element.disabled=false)
            //         for (var i = 0; i < project_form_tech.length; i++) {
            //             // Get the children of the current element
            //             // var children = project_form_tech.getElementsByTagName('input');
            //             project_form_tech[i].disabled = false
            //         }
            //     } else {
            //         project_thumbnail.src = 'Images/atal_icon.png';
            //         var x = document.getElementById("snackbar");
            //         x.className = "show";
            //         x.innerHTML = "Invalid Image Address"; setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
            //     }
            // }

            project_thumbnail.src = project_img_input.value + ''
            project_name.disabled = false
            project_desription_input.disabled = false;
            for (var i = 0; i < project_form_tech.length; i++) {
                project_form_tech[i].disabled = false
            }


            var inputElement_1 = document.getElementById('project-tech-name-1');
            inputElement_1.addEventListener('input', () => {
                const input_element = document.getElementById('project-tech-card-form-1')
                input_element.textContent = inputElement_1.value.toUpperCase() + ','
            })
            var inputElement_2 = document.getElementById('project-tech-name-2');
            inputElement_2.addEventListener('input', () => {
                const input_element = document.getElementById('project-tech-card-form-2')
                input_element.textContent = inputElement_2.value.toUpperCase() + ','
            })
            var inputElement_3 = document.getElementById('project-tech-name-3');
            inputElement_3.addEventListener('input', () => {
                const input_element = document.getElementById('project-tech-card-form-3')
                input_element.textContent = inputElement_3.value.toUpperCase() + ''
            })

            project_desription_input.addEventListener('input', () => {

                if (project_desription_input.value == '') {
                    project_description.textContent = 'Sample description add description to see the change...'
                } else
                    project_description.textContent = project_desription_input.value
            })
        }
        else {
            project_thumbnail.src = 'Images/atal_icon.png';
        }

    })
    project_name.addEventListener('input', () => {
        if (project_name.value == '') {
            project_title.textContent = 'SAMPLE TITLE'
        } else
            project_title.textContent = project_name.value.toUpperCase();
    })
}

function add_project_card() {
    const new_card = document.getElementById('form-project-card').outerHTML
    new_card.toString()
    populate_project_card(new_card.toString())
}

function populate_project_card(project_arr) {
    swal("Are you sure you want to add this card", {
        buttons: ["No", "Yes"],
    }).then((value) => {
        if (value) {
            CONSTANT.PROJECT_CARD_COUNT = CONSTANT.PROJECT_CARD_COUNT + 1;
            let project = getfromSession("project_array")
            if (project) {
                project = project.concat('^', project_arr)
                removeFromSession("project_array")
            } else {
                project = project_arr;
            }
            log("project", project)
            setInSession('project_array', project)
            swal("Card is added successfully", "Now proceed further", "success")
            const form_3 = document.getElementById('form_3');
            form_3.reset()
            const inputs = form_3.querySelectorAll('input, textarea');
            inputs.forEach((item, index) => {
                item.disabled = index !== 0;
            })
            // form_3=
            let project_card_desc = document.getElementById('project-form-description')
            let project_card_title = document.getElementById('project-title')
            let project_card_tech = document.getElementById('project-tech-card-form')
            let project_form_thumb = document.getElementById('project-form-thumbnail')
            project_card_desc.textContent = 'Sample description enter description below to see the change.'
            project_card_title.textContent = 'SAMPLE TITLE'
            project_form_thumb.src = 'Images/atal_icon.png'
            const tech_name_list = project_card_tech.querySelectorAll('li')
            log("tech_name_list======", tech_name_list)
            log("project_card_tech", project_card_tech)
            tech_name_list.forEach((item, index) => {
                item.textContent = `Tech-${index + 1}`
            })



            return project;
            // var card_after_selection = document.getElementById('project-card-container-after-selection')
            // card_after_selection.style.display = 'none';
            // var skill_desc = document.getElementById('about-the-project')
            // skill_desc.disabled = true;
        }
    });



}

function save_project_card() {

    const save_cards = getfromSession("project_array")
    if (save_cards) {

    } else {

    }

}






