import {
  LEFT_SIDE_CHARACTERS,
  LEFT_SIDE_LOADING,
  NAVBAR,
  PAGINATION_LEFT_ICON,
  PAGINATION_RIGHT_ICON,
  RIGHT_SIDE_DETAILS,
  RIGHT_SIDE_DETAILS_CHARACTER,
  RIGHT_SIDE_DETAILS_HOMEWORLD,
  RIGHT_SIDE_EMPTY_DETAILS,
  RIGHT_SIDE_LOADING,
} from "./constants.js";

export async function fetchCharacters(url) {
  const response = await fetch(url);
  const charactersObject = await response.json();
  return charactersObject;
}

export function createCharacterElements(characters) {
  const charactersElements = characters
    .map((character) => {
      // UNCERTAIN NEED - Extract the id from the characters' url and add it to the element.
      // const id = character.url
      //   .split("/")
      //   .filter((el) => el !== "")
      //   .pop();

      return /*html*/ `<h3 class="character">${character.name}</h3>`;
    })
    .join("");

  LEFT_SIDE_CHARACTERS.innerHTML = charactersElements;
}

export function createCharacterInfoElements(character) {
  const characterInfoElements = /*html*/ `
  <h3 class="character-info-name">${character.name}</h3>
  <div class="character-info">Height: ${character.height}</div>
  <div class="character-info">Mass: ${character.mass} kg</div>
  <div class="character-info">Hair color: ${character.hair_color}</div>
  <div class="character-info">Skin color: ${character.skin_color}</div>
  <div class="character-info">Eye color: ${character.eye_color}</div>
  <div class="character-info">Birth year: ${character.birth_year}</div>
  <div class="character-info">Gender: ${character.gender}</div>
  `;

  RIGHT_SIDE_DETAILS_CHARACTER.innerHTML = characterInfoElements;
}

export function createHomeworldInfoElements(homeworld) {
  const homeworldInfoElements = /*html*/ `
  <h3 class="homeworld-info-name">${homeworld.name}</h3>
  <div class="homeworld-info">Rotation period: ${homeworld.rotation_period} hours</div>
  <div class="homeworld-info">Orbital period: ${homeworld.orbital_period} days</div>
  <div class="homeworld-info">Diameter: ${homeworld.diameter} km</div>
  <div class="homeworld-info">Climate: ${homeworld.climate}</div>
  <div class="homeworld-info">Gravtity: ${homeworld.gravity} G</div>
  <div class="homeworld-info">Terrain: ${homeworld.terrain}</div>
`;

  RIGHT_SIDE_DETAILS_HOMEWORLD.innerHTML = homeworldInfoElements;
}

export function createNavbarPagination(currentPage, totalPages) {
  const navbarPaginationElements = /*html*/ `
  <span class="material-symbols-outlined left ${currentPage === 1 ? "disabled" : ""}"> 
    ${PAGINATION_LEFT_ICON} 
  </span>
  <span class="pagination">${currentPage} / ${totalPages}</span>
  <span class="material-symbols-outlined right ${currentPage === totalPages ? "disabled" : ""}">
    ${PAGINATION_RIGHT_ICON} 
  </span>
  `;

  NAVBAR.innerHTML = navbarPaginationElements;
}

export function hideLeftSideLoadingShowCharacters() {
  LEFT_SIDE_LOADING.classList.add("hide");
  LEFT_SIDE_CHARACTERS.classList.remove("hide");
  NAVBAR.classList.remove("hide");
}

export function hideLeftSideCharactersShowLoading() {
  LEFT_SIDE_CHARACTERS.classList.add("hide");
  LEFT_SIDE_LOADING.classList.remove("hide");
}

export function hideRightSideDetailsShowLoading() {
  RIGHT_SIDE_DETAILS.classList.add("hide");
  RIGHT_SIDE_LOADING.classList.remove("hide");
}

export function hideRightSideEmptyShowDetails() {
  console.log(RIGHT_SIDE_DETAILS);
  RIGHT_SIDE_EMPTY_DETAILS.classList.add("hide");
  RIGHT_SIDE_DETAILS.classList.remove("hide");
}

export function hideRightSideEmptyShowLoading() {
  RIGHT_SIDE_EMPTY_DETAILS.classList.add("hide");
  RIGHT_SIDE_LOADING.classList.remove("hide");
}

export function hideRightSideLoadingShowEmpty() {
  RIGHT_SIDE_LOADING.classList.add("hide");
  RIGHT_SIDE_EMPTY_DETAILS.classList.remove("hide");
}

export function hideRightSideLoadingShowDetails() {
  RIGHT_SIDE_LOADING.classList.add("hide");
  RIGHT_SIDE_DETAILS.classList.remove("hide");
}

export function toggleDisablePagination(isFetching) {
  const NAVBAR_LEFT_ICON = document.querySelector(".navbar .left");
  const NAVBAR_RIGHT_ICON = document.querySelector(".navbar .right");

  if (isFetching) {
    NAVBAR_LEFT_ICON.classList.add("disabled");
    NAVBAR_RIGHT_ICON.classList.add("disabled");
  } else {
    NAVBAR_LEFT_ICON.classList.remove("disabled");
    NAVBAR_RIGHT_ICON.classList.remove("disabled");
  }
}
