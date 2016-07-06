import { combineReducers } from 'redux';
import loki from 'lokijs';
import {LokiNativeScriptAdapter} from 'loki-nativescript-adapter';

var db = new loki('./loki.json',{autload: true, adapter: new LokiNativeScriptAdapter});
if(!db.getCollection('planeText')){
  db.addCollection('planeText');
}
const planeText = function(state = {title: ''},action){
  // estados siempre igual, excepto cuando cuambian en la accion
  state.message = {
    open: false,
    duration: 3000,
    message: ''
  }

  state.changeTitle = false;


  switch (action.type) {
    case 'KEEP':
      return Object.assign({},state,{text: action.text});
      break;
    case 'NEW':
      // Se crea un texto en la base de datos
      return Object.assign({},{title: ''});
      break;
    case 'DELETE':
      // Elimina un texto de la base de datos
      console.log('Eliminandolo de la base de datos');
      return Object.assign({},state);
      break;
    case 'CHANGE_TITLE':
      // Muestra el dialogo para cambiar el titulo y lo cambia
      console.log('Cambiando el titulo');

      var changeTitle = true;
      var title = state.title;

      if(action.title){
        if(typeof action.title == 'string'){
          title = action.title;
        }

        changeTitle = false;
      }
      return Object.assign({},state,{title: title,changeTitle: changeTitle});
      break;
    case 'SAVE':
      // Guardar todo en la base de datos
      var id = state.id;
      var collection = db.getCollection('planeText');
      var newDoc = collection.insertOne({title: state.title, text: state.text});
      console.log('guardando en la base de dato');
      console.log(db);
      console.log(newDoc);

      var message = createMessage(state.message,'SAVED');
      return Object.assign({},state,{message: message,id: id});
      db.saveDatabase(function(err,a){
        console.log(err);
        console.log(a);
      });

    default:
      return state;
  }
}

const createMessage = function(object,message,duration){
  object.message = message;
  object.open = true;

  if(duration){
    object.duration = duration;
  }

  return object;
}

export default combineReducers({
  planeText
});
