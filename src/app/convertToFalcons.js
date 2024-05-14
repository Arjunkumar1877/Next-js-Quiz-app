const { faIcons, faTable, faCamera, faQuestion, faCode } = require("@fortawesome/free-solid-svg-icons");


export function convertToFaIcons(textIcon){
    switch (textIcon) {
        case 'faCode':
            return faCode;
            break;
        case 'faTable':
            return faTable;
        case 'faCamera':
            return faCamera;
        case 'faQuestion':
            return faQuestion;
        default:
            return faQuestion;
    }
}




