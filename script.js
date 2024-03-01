document.addEventListener('DOMContentLoaded', function() {
  const textElement = document.getElementById('rotatingText');
  const texts = ["React Native", "ReactJS", "NodeJS", "Website"];
  let index = 0;

  function rotateText() {
    textElement.classList.remove('reveal-text'); // Remove class to reset animation
    setTimeout(() => {
      textElement.innerText = texts[index];
      textElement.classList.add('reveal-text'); // Add class to reapply animation
      index = (index + 1) % texts.length;
      textElement.style.color='#28FFBF'
    }, 1000); // Wait for animation duration before updating text
  }

  rotateText(); // Initial text
  setInterval(rotateText, 3000); // Rotate text every 3 seconds
});

//======= owner-name=======================================
const nameElement = document.getElementById('owner-name');
nameElement.textContent = 'Prince Verma';

//======= details-about-me ================================

const about_me=document.getElementById('details-about-me')
about_me.textContent ='I am an enthusiastic developer, with a rich experience of over 2-years in mobile app development , web & product design.'

//======= contact card ====================================
const contactData = [
  { src: 'Images/contact-icons/github.png', alt: 'Github', extra:'prince4799' },
  { src: 'Images/contact-icons/linkedin.png', alt: 'Linkedin',extra:'Prince Verma' },
  { src: 'Images/contact-icons/gmail.png', alt: 'Gmail',extra:'  prince4799@gmail.com' },
  { src: 'Images/contact-icons/phone.png', alt: 'Contact' ,
extra:'+91 9876541234'},
];

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
  
  type_name.textContent = imageAlt;
  type_details.innerText =extra_details;


  contactImgWrapper.appendChild(img)
  card.appendChild(contactImgWrapper);
  type.appendChild(type_name)
  type.appendChild(type_details)
  card.appendChild(type);
  return card;
}

// Function to populate the card in contact list
function populateCardList(contactData) {
  const cardListContainer = document.getElementById('card-list');
  
  contactData.forEach(image => {
    const card = createCard(image.src, image.alt,image.extra);
    cardListContainer.appendChild(card);
  });
}
// Call the function to populate the card view list with image data
populateCardList(contactData);




//skill-card-list
const skill_details=[{
  "img":"Images/tech-icons/rn.png",
  "name":"React Native",
  "details":"Working with react native on various project"
},{
  "img":"Images/tech-icons/Reactjs.png",
  "name":"ReactJs",
  "details":"Working with reactjs on various project"
},{
  "img":"Images/tech-icons/html-5.png",
  "name":"HTML",
  "details":"Working with HTML on various project"
},{
  "img":"Images/tech-icons/css.png",
  "name":"CSS",
  "details":"Working with css on various project"
},{
  "img":"Images/tech-icons/nodejs.png",
  "name":"NodeJs",
  "details":"Working with nodejs on various project"
},{
  "img":"Images/tech-icons/git.png",
  "name":"Git",
  "details":"Working with react native on various project"
},{
  "img":"Images/tech-icons/mysql.png",
  "name":"MySql",
  "details":"Working with react native on various project"
},{
  "img":"Images/tech-icons/mongoDb.png",
  "name":"MongoDB",
  "details":"Working with react native on various project"
},
{
  "img":"https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp",
  // "name":"MongoDB",
  "details":"Working with react native on various project"
},
]
//https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp
function createSkillcard(skill_img,skill_name,skill_detail){
 console.log(skill_img,skill_name,skill_detail);
  const skill_card=document.createElement('div');
  const skill_thumbnail_container=document.createElement('div');
  const skill_thumbnail=document.createElement('img');
  const skill_desc_container=document.createElement('div');
  const skill_type=document.createElement('h4')
  const skill_detail_desc=document.createElement('p')


  skill_card.classList.add('col-md-3', 'skill-card', 'rounded');
  skill_thumbnail_container.classList.add('d-flex','thumb-container','align-items-center','justify-content-center');
  skill_thumbnail.classList.add('skill-thumb','img-responsive','center-block');
  skill_desc_container.classList.add('skill-desc-container');

  skill_thumbnail.src=skill_img;
  skill_thumbnail.alt=skill_name;
  skill_type.textContent=skill_name
  skill_detail_desc.textContent=skill_detail

  skill_thumbnail_container.appendChild(skill_thumbnail);
  skill_card.appendChild(skill_thumbnail_container);

  skill_desc_container.appendChild(skill_type)
  skill_desc_container.appendChild(skill_detail_desc)

  skill_card.appendChild(skill_desc_container)

    return skill_card;
}

function pupolateSkillCard(){
  //skill-card-list
  //createSkillcard(skill_img,skill_name,skill_detail)

  const skill_card_list=document.getElementsByClassName('skill-card-list')[0]
  console.log("skilskill_card_listl_",skill_card_list);
  skill_details.forEach(image=>{
    if(image.img.length>0 && image.name.length>0 && image.details)
    skill_card_list.appendChild(createSkillcard(image.img,image.name,image.details));
  })

}

pupolateSkillCard();

//================ Project card list =====================


function createProjectCard(){
  
}