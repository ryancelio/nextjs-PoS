
export const toInternational = (value: string | null | any) => {
    // Reformata a formatada em Locale para poder se transformada em numero

    if(value !== null){

    // Replaces all chars that isnt a number, dot or comma
    value = value.replace(/[^\d.,]/g, '');
    
    // transforms all commas into dots
    value = value.replace(/,/g, '.').replace(/\.(?=.*\.)/g, '');
    }
    
    if(!Number(value)){
        return "";
    }

    return value;
}