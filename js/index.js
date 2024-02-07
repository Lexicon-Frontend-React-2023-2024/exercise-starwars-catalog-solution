import {
  LEFT_SIDE_CHARACTERS,
  NAVBAR,
  PAGINATION_LEFT_ICON,
  PAGINATION_RIGHT_ICON,
  RIGHT_SIDE_DETAILS,
  RIGHT_SIDE_DETAILS_CHARACTER,
} from "./constants.js";

import {
  createCharacterElements,
  createCharacterInfoElements,
  createHomeworldInfoElements,
  createNavbarPagination,
  fetchCharacters,
  hideLeftSideCharactersShowLoading,
  hideLeftSideLoadingShowCharacters,
  hideRightSideDetailsShowLoading,
  hideRightSideEmptyShowLoading,
  hideRightSideLoadingShowDetails,
  hideRightSideLoadingShowEmpty,
  toggleDisablePagination,
} from "./functions.js";

// ########## "Global" variables ##########
const baseURL = "https://swapi.dev/api";
let currentCharactersObject;
let currentPage = 1;
let totalPages;
let displayedCharacters;

// ########## Register Event Listeners ##########

LEFT_SIDE_CHARACTERS.addEventListener("click", (event) => handleOnCharactersClick(event));
NAVBAR.addEventListener("click", (event) => handleOnNavbarClick(event));

// ########## Making initial Request ##########

fetchCharacters(`${baseURL}/people`).then((charactersObject) => {
  currentCharactersObject = charactersObject;
  totalPages = Math.floor(charactersObject.count / 10);
  displayedCharacters = charactersObject.results;

  createCharacterElements(charactersObject.results);
  createNavbarPagination(currentPage, totalPages);
  hideLeftSideLoadingShowCharacters();
  hideRightSideLoadingShowEmpty();
});

// ########## Functions needed in this file, they need access to the "global" variables ##########

async function handleOnCharactersClick(event) {
  const target = event.target;

  if (!target.classList.contains("character")) return;

  const character = displayedCharacters.find(
    (character) => event.target.innerText === character.name
  );

  if (character === undefined) return;

  // When clicking on a selcted character, another fetch shouldn't be made.
  if (RIGHT_SIDE_DETAILS_CHARACTER.firstElementChild) {
    const characterName = RIGHT_SIDE_DETAILS_CHARACTER.firstElementChild.innerText;
    if (characterName === character.name) return;
  }

  !RIGHT_SIDE_DETAILS.classList.contains("hide")
    ? hideRightSideDetailsShowLoading()
    : hideRightSideEmptyShowLoading();

  const response = await fetch(character.homeworld);
  const homeworld = await response.json();

  createCharacterInfoElements(character);
  createHomeworldInfoElements(homeworld);
  hideRightSideLoadingShowDetails();
}

function handleOnNavbarClick(event) {
  const target = event.target;

  if (target.classList.contains("disabled")) return;

  switch (target.innerText) {
    case PAGINATION_LEFT_ICON:
      handleOnLeftClick();
      break;
    case PAGINATION_RIGHT_ICON:
      handleOnRightClick();
      break;
  }
}

async function handleOnLeftClick() {
  currentPage--;

  preFetchOperations();

  const previousCharactersObject = await fetchCharacters(currentCharactersObject.previous);
  currentCharactersObject = previousCharactersObject;
  displayedCharacters = previousCharactersObject.results;

  postFetchOperations(previousCharactersObject.results);
}

async function handleOnRightClick() {
  currentPage++;

  preFetchOperations();

  const nextCharactersObject = await fetchCharacters(currentCharactersObject.next);
  currentCharactersObject = nextCharactersObject;
  displayedCharacters = nextCharactersObject.results;

  postFetchOperations(nextCharactersObject.results);
}

function preFetchOperations() {
  // This first invocation is for updating the numbers
  createNavbarPagination(currentPage, totalPages);

  hideLeftSideCharactersShowLoading();
  toggleDisablePagination(true);

  !RIGHT_SIDE_DETAILS.classList.contains("hide")
    ? hideRightSideDetailsShowLoading()
    : hideRightSideEmptyShowLoading();
}

function postFetchOperations(characters) {
  createCharacterElements(characters);
  hideLeftSideLoadingShowCharacters();
  hideRightSideLoadingShowEmpty();
  toggleDisablePagination(false);

  // This second invocation is to check if any of the arrows should be disabled
  createNavbarPagination(currentPage, totalPages);
}
