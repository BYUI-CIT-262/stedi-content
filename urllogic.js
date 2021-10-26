

export const getApiRoot = () => {
    const hashTag = window.location.hash;
    console.log('Hash tag '+ hashTag);

    let apiRoot = hashTag === '#local' 
                ? 'http://localhost:4567' 
                : 'https://dev.stedi.me';

    if (window.location.hostname.includes('-dev')){
        apiRoot = 'https://dev.stedi.me';
    
    } else if (window.location.hostname.includes('stedi.me')){
        apiRoot = 'https://setdi.me';
    }
    return apiRoot;
}
