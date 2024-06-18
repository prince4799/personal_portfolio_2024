let color_of_body = '#000';
let color_of_reveal_text = '';

function switchTheme(color, body_color) {
  color_of_reveal_text = color
  color_of_body = body_color;
}

document.addEventListener('DOMContentLoaded', function () {
  // log("=====<><><><>")
  const textElement = document.querySelector('#rotatingText');
  const saved_domain= getfromSession('domain')

  function hide_buttons_signIn_create(){
    const is_signed_in= getfromSession('basic_details');
    const sign_in_button= document.getElementById('signIn');
    const create_your_own_button= document.getElementById('create_your_own');
    const search_mail= document.getElementsByClassName('search-text-input')[0]
  
    if(is_signed_in &&  sign_in_button?.style){
      sign_in_button.style.display='none';
    }else{
      if(create_your_own_button?.style)
     create_your_own_button.style.display='none';
      search_mail.style.display='none';
    }
  }
  hide_buttons_signIn_create()

  const texts =saved_domain!=''&& saved_domain!=null && saved_domain!= undefined ? saved_domain.split(','): ["React Native", "ReactJS", "NodeJS", "Website"];
  let index = 0;

  function rotateText() {
    textElement.classList.remove('reveal-text'); // Remove class to reset animation
    setTimeout(() => {
      textElement.innerText = texts[index];
      textElement.classList.add('reveal-text'); // Add class to reapply animation
      index = (index + 1) % texts.length;
      if (color_of_reveal_text == '') {
        textElement.style.color = '#28FFBF'
      } else {
        textElement.style.color = color_of_reveal_text
      }
    }, 1000); // Wait for animation duration before updating text
  }

  rotateText(); // Initial text
  setInterval(rotateText, 3000); // Rotate text every 3 seconds
});



function toggleThemes() {
  var themeOptions = document.getElementById('themeOptions');
    themeOptions.classList.toggle
}

//======= owner-name=======================================
const nameElement = document.getElementById('owner-name');
const stored_name=getfromSession('name')
nameElement.textContent = stored_name!=undefined && stored_name!='' && stored_name!=null?stored_name:'Prince Verma';

//======= details-about-me ================================

const about_me = document.getElementById('details-about-me')
const saved_about_me= getfromSession('about_yourself');
about_me.textContent = saved_about_me!= null && saved_about_me!= '' && saved_about_me!= undefined ?saved_about_me:'I am an enthusiastic developer, with a rich experience of over 2-years in mobile app development , web & product design.'



//======= contact card ====================================
const contactData = [
  { src: 'Images/contact-icons/github.png', alt: 'Github', extra: 'prince4799' },
  { src: 'Images/contact-icons/linkedin.png', alt: 'Linkedin', extra: 'Prince Verma' },
  { src: 'Images/contact-icons/gmail.png', alt: 'Gmail', extra: '  prince4799@gmail.com' },
  {
    src: 'Images/contact-icons/phone.png', alt: 'Contact',
    extra: '+91 9876541234'
  },
];

function save_contact() {
  const git_link = document.getElementById('github-profile-link')
  const linked_link = document.getElementById('linkedIn-profile-link')
  const gmail_link = document.getElementById('gmail-link')
  const phone_link = document.getElementById('contact-link')


  //===========  shorter way to directly set the data==============
  // const contact_links = [
  //   document.getElementById('github-profile-link').value,
  //   document.getElementById('linkedIn-profile-link').value,
  //   document.getElementById('gmail-link').value,
  //   document.getElementById('contact-link').value]

  const contact_links = [git_link.value, linked_link.value, gmail_link.value, phone_link.value]

  log("contact_links", contact_links)

  setInSession('contact_links', contact_links.join('^'))
  contact_links.map((item, index) => {
    if (item.length <= 0) //check here
    {
      alert("Contact Details can't be empty.")
      return;
    }

    item.extra = contact_links[index]
  })
  // populateCardList(contactData);
}


 
// }
async function create_your_own(){
  // data-bs-toggle="modal" data-bs-target="#myModal"
  // setInSession('basic_details', JSON.stringify(basic_details));
  const create_button= document.getElementById('create_your_own');
  try{
    // Assuming signInWithPopup() is a function that returns a Promise
     await signInWithPopup().then(result=>{log("result from signinpiiuagsdif",result);
    if(result?.status && result?.data!=null){
      

      const toggleAttribute = 'data-bs-toggle';
      const targetAttribute = 'data-bs-target';
      const toggleValue = 'modal';
      const targetValue = '#myModal';

      // Set the attribute values directly instead of creating a new attribute
      create_button.setAttribute(toggleAttribute, toggleValue);
      create_button.setAttribute(targetAttribute, targetValue);

      const value_from_session=getfromSession('basic_details');
      
      if( value_from_session?.length ==0 || value_from_session==null ){
        create_button.click()
        setInSession('basic_details', JSON.stringify(result.data));
      }else{
        
      }

    }
    else{
      log("failed to sign in ...",result);
    }
    })
   

   
  }catch(err){
    log("err in sign in ",err);
  }

 
}

// Function to create a contact card
function createCard(imageSrc, imageAlt, extra_details) {
  const card = document.createElement('div');
  card.classList.add('col-md-3', 'contact-card');

  const contactImgWrapper = document.createElement('div');
  contactImgWrapper.classList.add('contact-image-wrapper');

  const type = document.createElement('div');
  type.classList.add('w-100', 'contact-type');

  const type_name = document.createElement('h4');
  type_name.classList.add('contact-type-name');

  const type_details = document.createElement('span');
  type_details.classList.add('contact-type-details');

  const img = document.createElement('img');
  img.classList.add('contact-card-image');
  img.src = imageSrc;
  img.alt = imageAlt;

  const link = document.createElement('a');
  link.target = "_blank";
  link.href = "";

  type_name.textContent = imageAlt;
  type_details.innerText = extra_details;


  contactImgWrapper.appendChild(img)
  card.appendChild(contactImgWrapper);
  type.appendChild(type_name)
  link.appendChild(type_details)
  type.appendChild(link)
  card.appendChild(type);
  return card;
}

// Function to populate the card in contact list
function populateCardList(contactData) {
  const cardListContainer = document.getElementById('card-list');
  const contacts=getfromSession('contact_links')
  
  contactData.forEach((image,index) => {
    const card = createCard(image.src, image.alt, (contacts && contacts.length>1)?contacts.split('^')[index]:image.extra);
    cardListContainer.appendChild(card);
  });
}
populateCardList(contactData);
// Call the function to populate the card view list with image data

//skill-card-list
const skill_details = [
  {
    "img": "Images/tech-icons/rn.png",
    "name": "React Native",
    "details": "Working with react native on various project"
  },
  {
    "img": "Images/tech-icons/Reactjs.png",
    "name": "ReactJs",
    "details": "Working with reactjs on various project"
  },
  {
    "img": "Images/tech-icons/html-5.png",
    "name": "HTML",
    "details": "Working with HTML on various project"
  },
  {
    "img": "Images/tech-icons/css.png",
    "name": "CSS",
    "details": "Working with css on various project"
  },
  {
    "img": "Images/tech-icons/nodejs.png",
    "name": "NodeJs",
    "details": "Working with nodejs on various project"
  },
  {
    "img": "Images/tech-icons/git.png",
    "name": "Git",
    "details": "Working with react native on various project"
  },
  {
    "img": "Images/tech-icons/mysql.png",
    "name": "MySql",
    "details": "Working with react native on various project"
  },
  {
    "img": "Images/tech-icons/mongoDb.png",
    // "img":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yugabytedb/yugabytedb-original.svg",
    "name": "MongoDB",
    "details": "Working with react native on various project"
  },
  // {
  //   "img":"https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp",
  //   // "name":"MongoDB",
  //   "details":"Working with react native on various project"
  // },
]
//https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp
function createSkillcard(skill_img, skill_name, skill_detail) {
  const skill_card = document.createElement('li');
  const skill_thumbnail_container = document.createElement('div');
  const skill_thumbnail = document.createElement('img');
  const skill_desc_container = document.createElement('div');
  const skill_type = document.createElement('h4')
  const skill_detail_desc = document.createElement('p')


  skill_card.classList.add('col-md-3', 'skill-card', 'rounded');
  skill_thumbnail_container.classList.add('d-flex', 'thumb-container', 'align-items-center', 'justify-content-center');
  skill_thumbnail.classList.add('skill-thumb', 'img-responsive', 'center-block');
  skill_desc_container.classList.add('skill-desc-container');

  skill_thumbnail.src = skill_img;
  skill_thumbnail.alt = skill_name;
  skill_type.textContent = skill_name
  skill_detail_desc.textContent = skill_detail

  skill_thumbnail_container.appendChild(skill_thumbnail);
  skill_card.appendChild(skill_thumbnail_container);

  skill_desc_container.appendChild(skill_type)
  skill_desc_container.appendChild(skill_detail_desc)

  skill_card.appendChild(skill_desc_container)
  return skill_card;
}

function populateSkillCard() {
  //skill-card-list
  //createSkillcard(skill_img,skill_name,skill_detail)

  const skill_card_list = document.getElementsByClassName('skill-card-list')[0]
  let stored_skill_card = sessionStorage.getItem('skill_array')
  if (stored_skill_card) {
    stored_skill_card = stored_skill_card.split(',')
    CONSTANT.SKILL_CARD_COUNT = stored_skill_card.length;
    log("CONSTANT.SKILL_CARD_COUNT > 0", CONSTANT.SKILL_CARD_COUNT)
  }
  if (CONSTANT.SKILL_CARD_COUNT > 0) {
    // log('stored_skill_card', stored_skill_card)
    stored_skill_card.forEach((item, index) => {
      log("item ", index, item)
      const parser = new DOMParser();
      const element = parser.parseFromString(item, 'text/html');
      // if (element.childNodes.length > 0) {
      //   // skill_card_list.appendChild(element.childNodes[0]);
      //   const firstChild = element.childNodes[0];
      //   while (firstChild.childNodes.length > 0) {
      //     const grandChild = firstChild.childNodes[0];
      //     log("=======>", grandChild)
      //     if (grandChild.nodeName !== 'body') {
      //       skill_card_list.appendChild(grandChild);
      //     }
      //   }
      // }
      const bodyChildren = element.body.childNodes;

      if (bodyChildren.length > 0) {
        for (let i = 0; i < bodyChildren.length; i++) {
          const child = bodyChildren[i];
          skill_card_list.appendChild(child.cloneNode(true));
        }
      }


    })
  }
  else {
    skill_details.forEach(image => {
      if (image.img.length > 0 && image.name.length > 0 && image.details) {
        skill_card_list.appendChild(createSkillcard(image.img, image.name, image.details));
      }
    })
  }
}

populateSkillCard();

//================ Project card list =====================

const project_details = [
  {
    title: "ATAL JAL",
    project_details: `Lutem architecto animi illum facere, dicta aspernatur aliquid saepe vero
  consequuntur
  voluptas eum commodi, repudiandae sequi veniam eveniet nisi veritatis magni
  error dolor
  dolorum velit, maiores earum! Adipisci, pariatur!
  Ut similique nobis adipisci, impedit
  Numquam ipsa sit perspiciatis! Corporis error, voluptates quas sapiente, commodi`,
    project_img: "Images/atal_icon.png",
    // project_tech_icons: ["Images/tech-icons/rn.png", "Images/tech-icons/php.png", "Images/tech-icons/dot-net.png"]
    project_tech_icons: ["Images1", "Images2", "Images3", "Images2", "Images3", "Images2", "Images3", "Images2", "Images3"]
  },
  {
    title: "EV-YATRAqwertyuioplkjhgfdsazxcvbnm",
    project_details: `Lutem architecto animi illum facere, dicta aspernatur aliquid saepe vero
  consequuntur
  voluptas eum commodi, repudiandae sequi veniam eveniet nisi veritatis magni
  error dolor
  dolorum velit, maiores earum! Adipisci, pariatur!
  Ut similique nobis adipisci, impedit
  Numquam ipsa sit perspiciatis! Corporis error, voluptates quas sapiente, commodi`,
    project_img: "Images/beev.png",
    // project_tech_icons: ["Images/tech-icons/rn.png", "Images/tech-ic ons/php.png", "Images/tech-icons/dot-net.png"]
    project_tech_icons: ["Images1", "Images2", "Images3"]

  },
  {
    title: "JREDA",
    project_details: `Lutem architecto animi illum facere, dicta aspernatur aliquid saepe vero
  consequuntur
  voluptas eum commodi, repudiandae sequi veniam eveniet nisi veritatis magni
  error dolor
  dolorum velit, maiores earum! Adipisci, pariatur!
  Ut similique nobis adipisci, impedit
  Numquam ipsa sit perspiciatis! Corporis error, voluptates quas sapiente, commodi`,
    project_img: "Images/jreda_icon.png",
    // project_tech_icons: ["Images/tech-icons/rn.png", "Images/tech-icons/php.png", "Images/tech-icons/dot-net.png"]
    project_tech_icons: ["Images1", "Images2", "Images3"]

  },
  {
    title: "JREDA",
    project_details: `Lutem architecto animi illum facere, dicta aspernatur aliquid saepe vero
  consequuntur
  voluptas eum commodi, repudiandae sequi veniam eveniet nisi veritatis magni
  error dolor
  dolorum velit, maiores earum! Adipisci, pariatur!
  Ut similique nobis adipisci, impedit
  Numquam ipsa sit perspiciatis! Corporis error, voluptates quas sapiente, commodi`,
    project_img: "Images/jreda_icon.png",
    project_tech_icons: ["Images/tech-icons/rn.png", "Images/tech-icons/php.png", "Images/tech-icons/dot-net.png"]
  },
  {
    title: "JREDA",
    project_details: `Lutem architecto animi illum facere, dicta aspernatur aliquid saepe vero
  consequuntur
  voluptas eum commodi, repudiandae sequi veniam eveniet nisi veritatis magni
  error dolor
  dolorum velit, maiores earum! Adipisci, pariatur!
  Ut similique nobis adipisci, impedit
  Numquam ipsa sit perspiciatis! Corporis error, voluptates quas sapiente, commodi`,
    project_img: "Images/jreda_icon.png",
    project_tech_icons: ["Images/tech-icons/rn.png", "Images/tech-icons/php.png", "Images/tech-icons/dot-net.png"]
  },
]


function createProjectCard(project_detail) {

  const project_card_container = document.createElement('li');
  // project_card_container.classList.add('col-md-3', 'project-container');
  project_card_container.classList.add('col-md-3', 'project-container');



  const card_container = document.createElement('div');
  card_container.classList.add('card-container');

  project_card_container.appendChild(card_container);

  const project_card = document.createElement('div');
  project_card.classList.add('project-card');
  card_container.appendChild(project_card);

  const title_icon_desc = document.createElement('div');
  title_icon_desc.classList.add("title-icon-desc", "container-fluid", "d-flex", "flex-row");

  const project_img = document.createElement('img');
  project_img.classList.add('img-thumbnail');
  project_img.src = (project_detail.project_img);
  project_img.alt = (project_detail.title);
  title_icon_desc.appendChild(project_img);

  const title_tech_container = document.createElement('div');
  title_tech_container.classList.add("title-tech",);
  title_icon_desc.appendChild(title_tech_container);

  const project_name = document.createElement('h3');
  project_name.classList.add("text-center")
  project_name.textContent = project_detail.title;
  title_tech_container.appendChild(project_name);

  const project_tech_container = document.createElement('ul');
  project_tech_container.classList.add("d-flex", "align-items-center", 'project-tech-container')
  project_tech_container.style.listStyleType = 'none';
  project_tech_container.style.overflow = 'auto';
  project_tech_container.style.height = '40px';
  project_tech_container.style.padding = '0'
  title_tech_container.appendChild(project_tech_container);

  const tech_used = project_detail.project_tech_icons.forEach(img => {
    const tech_img = document.createElement('li');
    tech_img.classList.add('tech-icons')
    // tech_img.src = img;
    tech_img.textContent = img;
    project_tech_container.appendChild(tech_img);
  })
  /**<ul class="d-flex align-items-center project-tech-container" style="height: 30px; list-style-type: none; overflow-y: auto; overflow: scroll;"><li class="tech-icons">Images1</li><li class="tech-icons">Images2</li><li class="tech-icons">Images3</li><li class="tech-icons">Images2</li><li class="tech-icons">Images3</li></ul> */


  const project_details = document.createElement('div');
  project_details.classList.add("container-fluid", "project-details");
  const tech_details = document.createElement
    ('p');
  tech_details.textContent = project_detail.project_details;
  project_details.appendChild(tech_details)




  project_card.appendChild(title_icon_desc);
  project_card.appendChild(project_details);
  return project_card_container;

}

function populateProjectCard() {

  const projects_container = document.getElementsByClassName('projects')[0]
  const heading_container = document.createElement('div');
  const heading_container_row = document.createElement('div');
  heading_container.classList.add('col-md-12');
  heading_container_row.classList.add('row');
  const heading = document.createElement('h1');
  heading.textContent = 'Projects';
  heading_container.appendChild(heading);
  heading_container_row.appendChild(heading_container);

  const heading_card_container = document.createElement('ul');
  heading_card_container.classList.add('project-card-container', "list-group", "list-group-horizontal-lg");
  //class="project-card-container list-group list-group-horizontal-lg"
  //================

  let saved_project_card = getfromSession('project_array');

  projects_container.appendChild(heading_container_row)
  projects_container.appendChild(heading_card_container)

  if (saved_project_card && saved_project_card.length > 0) {


    saved_project_card = saved_project_card.split('^')

    saved_project_card.forEach((item, index) => {
      const parser = new DOMParser();
      const element = parser.parseFromString(item, 'text/html');
      const bodyChildren = element.body.childNodes;

      if (bodyChildren.length > 0) {
        for (let i = 0; i < bodyChildren.length; i++) {
          const project_card_container = document.createElement('li');
          project_card_container.classList.add('col-md-3', 'project-container');
          const child = bodyChildren[i];
          project_card_container.appendChild(child.cloneNode(true));
          heading_card_container.appendChild(project_card_container)
        }
      }
    })

    // for(let i=0; i<CONSTANT.PROJECT_CARD_COUNT;i++){
    //   const card=document.getElementsByClassName(`project-card${i}`);
    //   heading_card_container.appendChild(card)
    // }
    // projects_container.appendChild()

    // project_card_container.appendChild(card_container);

    // saved_project_card.forEach((item, index) => {
    //   log("item===========>",index,item)
    //   item.removeAttribute('id');
    //   const listItems = item.querySelectorAll('li'); //same for 

    //   listItems.forEach(listItem => {
    //     listItem.removeAttribute('id');
    //   });
    // })
    // projects_container.appendChild(heading_card_container)

    return;
  }

  //================
  project_details.forEach(detail => {
    heading_card_container.appendChild(createProjectCard(detail))
  })


}

populateProjectCard()


function retrieveFrom() {


  const retrieve = sessionStorage.getItem('user_credential');

}

retrieveFrom()

const textarea = document.getElementById('aboutYourself');

textarea.addEventListener('input', () => {
  const lenth_of = textarea.value.trim().length;
  if (lenth_of == 0) {
    document.getElementById('wordCount').textContent = `(${lenth_of} words)`;
  } else {
    const wordCount = textarea.value.trim().split(' ').length;
    document.getElementById('wordCount').textContent = `(${wordCount} words)`;
  }
});

function change_form(form_id, nav_mode) {
  // change_form_title()

  let valid = document.getElementById(form_id)
  valid.classList.add('form-hide');
  let temp_form = form_id.split('_');

  if (nav_mode === 'next') {
    let old_form = document.getElementById(form_id);
    old_form.classList.remove('form-show')
    let new_id = parseInt(temp_form[1]) + 1

    const new_form = temp_form[0] + '_' + new_id
    valid = document.getElementById(new_form);
    valid.classList.add('form-show');
  }

  if (nav_mode === 'previous') {
    let old_form = document.getElementById(form_id);
    old_form.classList.remove('form-show')
    old_form.classList.add('form-hide');
    let new_id = parseInt(temp_form[1]) - 1

    const new_form = temp_form[0] + '_' + new_id
    valid = document.getElementById(new_form);
    valid.classList.add('form-show');
  }

}

async function search_icon(icon_name) {
  const url = `https://api.iconify.design/search?query=${icon_name}&limit=999`;
  const new_icon_array = [];
  try {
    const response = await fetch(url);
    if (response.status == 200) {
      const data = await response.json();

      if (data.total && data.total > 0) {
        const contact_skill_pop_up = document.getElementById('contact-skill-pop-up')
        contact_skill_pop_up.classList.add('d-flex')
        const svg_promises = [];
        for (let i = 0; i < data.total; i++) {
          const icon_name = data.icons[i].split(':');
          svg_promises.push(fetchSvg(icon_name[0], icon_name[1]));
        }
        // Wait for all svg_promises to resolve
        const svg_data = await Promise.all(svg_promises);
        new_icon_array.push(...svg_data);
      }
      else {
        alert(`Unable to find the icon of ${icon_name} please try another.`)
      }
    }
    const parent_icon_div = document.getElementById('icon_container');

    while (parent_icon_div.children.length > 0) {
      parent_icon_div.removeChild(parent_icon_div.children[0]);
    }
    new_icon_array.forEach(svg => {
      const svg_div = document.createElement('div')
      svg_div.classList.add('modal-icon-content')
      svg_div.id = 'modal-icon-content'

      svg_div.innerHTML = svg;

      // save the svg into card 
      svg_div.addEventListener('click', function () {
        const contact_skill_pop_up = document.getElementById('contact-skill-pop-up')
        // remove the skill svg pop-up after click 
        contact_skill_pop_up.classList.remove('d-flex')
        var card_after_selection = document.getElementById('skill-card-container-after-selection')
        //create ne card on form after selecting the svg 
        if (card_after_selection.style.display = 'none') {
          card_after_selection.style.removeProperty('display')
        }
        let skill_card_arr = [{ "element": svg_div.innerHTML, "name": icon_name }]

        let html = skill_card_arr.map((item, index) => {
          return `<div class="col-md-3 skill-card rounded">
                    <div class="d-flex thumb-container thumb-container-selected align-items-center justify-content-center ml-0">
                      ${item.element}
                    </div>
                    <div class="skill-desc-container">
                      <h4>${item.name.toUpperCase()}</h4>
                      <p id="about-the-skill-card-${index + 1}">Start typing in the below feild to see the change</p>
                    </div>
                  </div>`;
        }).join(""); // Join the resulting array into a single string

        // Assign the HTML to card_after_selection.innerHTML
        // work here as new and old card which are saved in session must show here
        card_after_selection.innerHTML = html;
        var skill_desc_card = document.getElementById('about-the-skill-card-1')
        var skill_desc = document.getElementById('about-the-skill')
        skill_desc.disabled = false
        skill_desc.addEventListener('input', () => {
          skill_desc_card.textContent = skill_desc.value
        })
        let add_skill = document.getElementById('add_skill')
        add_skill.addEventListener('click', function () {
          const htmlStringWithoutEscapes = html.replace(/\\/g, '')
          save_skill_card(htmlStringWithoutEscapes.replace(/Start typing in the below feild to see the change/i, skill_desc.value))
        })

      });

      svg_div.childNodes[0].setAttribute('height', '6em')
      svg_div.childNodes[0].setAttribute('width', '6em')


      parent_icon_div.appendChild(svg_div);
    });


  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchSvg(prefix, icon) {
  try {
    const response = await fetch(`https://api.iconify.design/${prefix}/${icon}.svg`);
    const data = await response.text();
    if (response.status == 200) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

var next1 = document.getElementById('form_1_next')
var next2 = document.getElementById('form_2_next')
var next3 = document.getElementById('form_3_next')
var submit_form = document.getElementById('form_4_submit')

var previous2 = document.getElementById('form_2_previous')
var previous3 = document.getElementById('form_3_previous')
var previous4 = document.getElementById('form_4_previous')


var form_title;

next1.onclick = function () {
  const is_signed_in= getfromSession('basic_details');
  log("is_signed",is_signed_in)
  if(is_signed_in==null){
    swal({
      'title': `You have not signed in. To create your portfolio signin first.`,
      'icon': 'error',
      'buttons': {
        text: "OK",
        value: false,
       
      },
      
    })
  }else{
    form_1(); change_form('form_1', 'next')
  form_title = document.getElementById('modal-title');
  form_title.textContent = "Skills details";
  }
  
}

next2.onclick = function () {
  let skill = getfromSession("skill_array")
  // log("skill", skill, skill.split(',').length)
  if (skill) {
    CONSTANT.SKILL_CARD_COUNT = parseInt(skill.split(',').length);
  }
  if (CONSTANT.SKILL_CARD_COUNT > 0) {
    //======== you can also add custom component to swal by uncommenting the following code.
    //     var wrapper = document.createElement('h1');
    //     wrapper.innerHTML = 'this is bold text';
    swal({
      'title': `You have added ${CONSTANT.SKILL_CARD_COUNT} cards want to proceed further`,
      'icon': 'warning',
      // 'content': {
      //   'element':wrapper,
      //   'attributes': {
      //     'placeholder': "Type your password",
      //     'type': "password",
      //   },
      // },
      'buttons': [{
        text: "NO",
        value: false,
        visible: true,
        closeModal: true,
      },
      {
        text: "YES",
        value: true,
        visible: true,
        closeModal: true,
      }]
    }).then(value => {
      if (value) {
        form_2(); change_form('form_2', 'next')
        form_title = document.getElementById('modal-title');
        form_title.textContent = "Project details";
      }
    }
    )
  }
  else {
    swal({
      text: "You must add atleast one card for you skills.",
      icon: 'error'
    })

    // remove the code from below
    form_2(); change_form('form_2', 'next')
    form_title = document.getElementById('modal-title');
    form_title.textContent = "Project details";
  }

}

previous2.onclick = function () {
  form_2(); change_form('form_2', 'previous')
  form_title = document.getElementById('modal-title');
  form_title.textContent = "Basic details";
}

next3.onclick = function () {
  let project = getfromSession("project_array")
  if (project) {
    CONSTANT.PROJECT_CARD_COUNT = parseInt(project.split('^').length);
  }
  if (CONSTANT.PROJECT_CARD_COUNT > 0) {

    swal({
      'title': `You have added ${CONSTANT.PROJECT_CARD_COUNT} cards want to proceed further`,
      'icon': 'warning',
      'buttons': [{
        text: "NO",
        value: false,
        visible: true,
        closeModal: true,
      },
      {
        text: "YES",
        value: true,
        visible: true,
        closeModal: true,
      }]
    }).then(value => {
      if (value) {
        // form_2();
        change_form('form_3', 'next')
        form_title = document.getElementById('modal-title');
        form_title.textContent = "Contact details";
      }
    }
    )
  }
  else {
    swal({
      text: "You must add atleast one card for you projects.",
      icon: 'error'
    })

  }
}

previous3.onclick = function () {
  change_form('form_3', 'previous')
  form_title = document.getElementById('modal-title');
  form_title.textContent = "Skills details";
}

submit_form.onclick= function (){
  save_contact()
  save_data_in_firebase()
  let old_form = document.getElementById('form_4');
  old_form.classList.remove('form-show')
  old_form.classList.add('form-hide');
  let main_form = document.getElementById('myModal');
  main_form.classList.remove('show')
  main_form.style.setProperty('display','none')
  
}

var inputs = document.querySelectorAll('input');

// Attach event listener to each input element
inputs.forEach(function (input) {
  input.addEventListener('keydown', function (event) {
    if (event?.keyCode === 13) {
      event.preventDefault();
    }
  });
});

