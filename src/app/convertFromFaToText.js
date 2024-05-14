const { faIcons, faTable, faCamera, faQuestion, faCode } = require("@fortawesome/free-solid-svg-icons");


export function convertFaToText(icon){
    if(icon === faCode){
        return 'faCode';
    }else if(icon === faTable){
        return 'faTable';
    }else if(icon === faCamera){
        return 'faCamera'
    }else{
        return 'faQuestion'
    }
}