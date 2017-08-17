import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from 'modules';
import { autoRehydrate, persistStore, createTransform } from 'redux-persist';


const reducer = combineReducers({
  ...reducers
});

/* Redux dev tool, install chrome extension in
 * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en */
const devToolsExtension = (
  (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') ?
  window.devToolsExtension() :
  (f => f)
);

const builderTransform = createTransform(
  (state, key) => ({ "new": state.new }),
  (state, key) => state,
  { whitelist: ['builder'] },
);

const store = () => {
  const store = createStore(
    reducer,
    compose(
      /* The router middleware MUST be before thunk otherwise the URL changes
      * inside a thunk function won't work properly */
      applyMiddleware(thunk),

      autoRehydrate(),
      devToolsExtension,
    )
  );

  if (process.browser) {
    persistStore(
      store,
      {
        whitelist: ['builder', 'auth'],
        transforms: [builderTransform],
      },
    );
  }

  return store;
}

export { store };
