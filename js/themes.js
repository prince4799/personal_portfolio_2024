
/**
 --primary: #0B5226;
  --secondary: #28FFBF;
  --light: #82D096;
  --emerald: #00A172;
  --pale: #9BFFCD;
  --text-profile-shadow: #fff;
  --name-cardBackground-borders: rgb(75, 73, 73);
 */

// import { switchTheme } from "./script";

/**
--primary: #0B5226;  #192655 #071952
--secondary: #28FFBF; #7BD3EA 
--light: #82D096; #86B6F6 
--emerald: #00A172; #00A9FF 
--pale: #9BFFCD;  #96EFFF
--text-profile-shadow: #fff;
--name-cardBackground-borders: rgb(75, 73, 73); #6499E9  #192655
*/



function resetToBlue() {
    switchTheme('#192655', '#071952');

    document.getElementsByClassName('waves')[0].style.backgroundColor = '#071952'

    document.documentElement.style.setProperty('--secondary', '#071952');
    document.documentElement.style.setProperty('--primary', '#7BD3EA');
    document.documentElement.style.setProperty('--light', '#86B6F6');
    document.documentElement.style.setProperty('--emerald', '#00A9FF');
    document.documentElement.style.setProperty('--pale', '#96EFFF');
    document.documentElement.style.setProperty('--text-profile-shadow', '#96EFFF');
    document.documentElement.style.setProperty('--name-cardBackground-borders', '#192655');
    document.documentElement.style.setProperty('--body-background', '#071952');
    document.documentElement.style.setProperty('--section-2', '#16224a')
    document.documentElement.style.setProperty('--project-skill-desc', '#1D5D9B') //113961
    document.documentElement.style.setProperty('--thumbnail-icon-container', '#113961') //113961
    document.documentElement.style.setProperty('--form-grad-1', '##F5F7F6'); //113961
    document.documentElement.style.setProperty('--form-grad-2', '##5CA0F2'); //113961
    
}

function resetToGreen() {
    switchTheme('#28FFBF', '#000');

    document.getElementsByClassName('waves')[0].style.backgroundColor = '#000'

    document.documentElement.style.setProperty('--secondary', '#28FFBF');
    document.documentElement.style.setProperty('--primary', '#0B5226');
    document.documentElement.style.setProperty('--light', '#82D096');
    document.documentElement.style.setProperty('--emerald', '#00A172');
    document.documentElement.style.setProperty('--pale', '#9BFFCD');
    document.documentElement.style.setProperty('--text-profile-shadow', '#fff');
    document.documentElement.style.setProperty('--name-cardBackground-borders', '#4b4949');
    document.documentElement.style.setProperty('--body-background', '#000');
    document.documentElement.style.setProperty('--section-2', '#0f0e0e');
    document.documentElement.style.setProperty('--project-skill-desc', '#232222') //113961
    document.documentElement.style.setProperty('--thumbnail-icon-container', '#1e1d1d'); //113961
    document.documentElement.style.setProperty('--form-grad-1', '#93e9be'); //113961
    document.documentElement.style.setProperty('--form-grad-2', '#50c878'); //113961
}

function resetToOrange() {
    switchTheme('#C51605', '#FFECAF');

    document.getElementsByClassName('waves')[0].style.backgroundColor = '#EE9322'

    document.documentElement.style.setProperty('--secondary', '#FFF78A');
    document.documentElement.style.setProperty('--primary', '#FFE382');
    document.documentElement.style.setProperty('--light', '#FFC47E');
    document.documentElement.style.setProperty('--emerald', '#C51605');
    document.documentElement.style.setProperty('--pale', '#FDFFAB');
    document.documentElement.style.setProperty('--text-profile-shadow', '#C51605');
    document.documentElement.style.setProperty('--name-cardBackground-borders', '#FDFFAB');
    document.documentElement.style.setProperty('--body-background', '#EE9322');
    document.documentElement.style.setProperty('--section-2', '#efcc95');
    document.documentElement.style.setProperty('--project-skill-desc', '#FFBB64') //113961
    document.documentElement.style.setProperty('--thumbnail-icon-container', '#FFCC70'); //113961
    document.documentElement.style.setProperty('--form-grad-1', '#FFC47E'); //113961
    document.documentElement.style.setProperty('--form-grad-2', '#C51605'); //113961
}


//#FFF78A