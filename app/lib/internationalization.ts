
export const toInternational = (value: string) => {
    // Reformata a formatada em Locale para poder se transformada em numero

    // Replaces all chars that isnt a number, dot or comma
    value = value.replace(/[^\d.,]/g, '');
    
    // transforms all commas into dots
    value = value.replace(/,/g, '.').replace(/\.(?=.*\.)/g, '');

    if(!Number(value)){
        return "";
    }

    console.log(value);

    return value;
}