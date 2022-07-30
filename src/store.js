import { configureStore } from '@reduxjs/toolkit'
import effects from 'src/redux/effects';
import reducer from 'src/redux/reducer';

const effectsMiddlewares = effects.map(effect => store => next => action => {
	next(action);
	effect(store, action);
});

export default configureStore({reducer, middleware: effectsMiddlewares});
