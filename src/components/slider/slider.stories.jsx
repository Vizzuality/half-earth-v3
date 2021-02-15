import React from "react";
// import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
// import createHistory from "rudy-history/createBrowserHistory";
// import connectRoutes from 'redux-first-router'
import Slider from "./slider-component";;

// const history = createHistory();

// const { enhancer, middleware, reducer } = connectRoutes(history, {
//   LIST: '/list/:category'
// })

// const rootReducer = combineReducers({ location: reducer })
// const store = createStore(rootReducer, compose(enhancer, applyMiddleware(middleware)))

export default {
  title: "Slider",
  component: Slider
};

// const Context = React.createContext();

// const Template = (args) => <Context.Provider store={store}><Slider {...args} /></Context.Provider>;
const Template = (args) => <Slider {...args} />;

export const Story = Template.bind({});
