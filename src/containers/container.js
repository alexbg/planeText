import { connect } from 'react-redux';
import  actions  from './../actions/actions';
import component from './../components/App';

var getStates = function(state){

  return {
    planeText: state.planeText
  }
}

var actionsButtons = function(dispatch){
  return {
    create: function(title){
      console.log('Creando el texto');
      dispatch(actions.create(title));
    },
    keep: function(text){
      dispatch(actions.keep(text));
    },
    save: function(){
      dispatch(actions.save());
    },
    changeTitle: function(title){
      dispatch(actions.changeTitle(title));
    }
  }
}

const planeText = connect(
  getStates, // states
  actionsButtons // dispatch
)(component);

//console.log(planeText);

export default planeText;