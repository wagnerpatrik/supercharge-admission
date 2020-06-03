import { BoardState } from './board.state';
import * as BoardActions from './board.actions';
import { CardVisibilityState } from 'src/app/shared/models';

export type Action = BoardActions.All;

const initialState: BoardState = {
  deck: [],
  moves: [],
  loading: false,
  deckSize: null,
  foundPairs: [],
  cardsVisibility: {} as CardVisibilityState,
};

export function BoardReducer(state = initialState, action: Action): BoardState {
  switch (action.type) {
    case BoardActions.ADD_TO_MOVES: {
      return { ...state, moves: [...state.moves, action.id] };
    }

    case BoardActions.SET_NEW_PAIR: {
      return { ...state, foundPairs: [...state.foundPairs, action.id] };
    }

    case BoardActions.GENERATE_DECK: {
      return { ...state, loading: true };
    }

    case BoardActions.SET_DECK: {
      return {
        ...initialState,
        loading: false,
        deck: [...action.deck],
        deckSize: action.deck.length / 2,
      };
    }

    case BoardActions.SET_CARD_VISIBILITY: {
      return {
        ...state,
        cardsVisibility: Object.values(action.cardVisibility).length
          ? { ...state.cardsVisibility, ...action.cardVisibility }
          : {},
      };
    }

    default:
      return state;
  }
}
