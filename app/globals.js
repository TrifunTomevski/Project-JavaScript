let currentArtist;

// Local Storage
export function setCurrentArtists(artist) {
    currentArtist = artist;
    localStorage.setItem("artist", currentArtist);
}

export function getCurrentArtist() {
    return localStorage.getItem("artist") ?? currentArtist;
}
