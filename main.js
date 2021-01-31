console.log(window.Redux);

const { createStore } = window.Redux;

// state
// reducer
// store

const initialState = JSON.parse(localStorage.getItem('hobby_list')) || [];

const hobbyReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_HOBBY':
      return [...state, action.payload];

    default:
      return state;
  }
}

const store = createStore(hobbyReducer);

// render Redux hooby list
const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.querySelector('#hobbiesListId');
  if (!ulElement) return;

  ulElement.innerHTML = '';

  for (const hobby of hobbyList) {
    const liElement = document.createElement('li');
    liElement.textContent = hobby;

    ulElement.appendChild(liElement);
  }
}

// render initial list
const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList);

// add hobby via form
const hobbyFormElement = document.querySelector('#hobbyFormId');
if (hobbyFormElement) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const hobbyInputElement = hobbyFormElement.querySelector('#hobbyTextId');
    if (!hobbyInputElement) return;

    const action = {
      type: 'ADD_HOBBY',
      payload: hobbyInputElement.value
    }
    store.dispatch(action)

    // reset form
    hobbyFormElement.reset();
  }

  hobbyFormElement.addEventListener('submit', handleFormSubmit)
}

store.subscribe(() => {
  renderHobbyList(store.getState())

  // perist state --- local storage
  localStorage.setItem('hobby_list', JSON.stringify(store.getState()))
})