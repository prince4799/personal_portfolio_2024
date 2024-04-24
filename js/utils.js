 function log(...options){
    if(true)
    console.log(...options)
    
}

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

 const CONSTANT={
    SKILL_CARD_COUNT:undefined,
    PROJECT_CARD_COUNT:undefined,

}

//======= Below is a perogram of a js function in which you don't have to care about the parameter serialization,
//======= you can send values to the function parameter in any order
/**
 function params_check({val1,val2,val3}){
  console.log("val1",val1);
  console.log("val2",val2);
  console.log("val3",val3);
}

params_check({
  val2: 1,
  val3: 2,
  val1: 3
});
 */