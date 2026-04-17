'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  // Створюємо змінну для відстеження поточного стану, починаючи з початкового
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties': {
        const nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        currentState = nextState;
        break;
      }

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
