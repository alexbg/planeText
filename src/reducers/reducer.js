import { combineReducers } from 'redux';

import PouchDB from 'pouchdb';

var db = new PouchDB('planeText',{adapter: 'websql'});
db.destroy(function(){
  db = new PouchDB('planeText',{adapter: 'websql'});
});

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
      console.log(action.text);
      return Object.assign({},state,{text: action.text.text});
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

      console.log('ESTA EN EL SAVE');

      return Object.assign({},state,{promise: db.post({title: state.title,text: state.text})});

      break;
    case 'MESSAGE':
      console.log('ESTA EN EL MESSAGE');
      var message = createMessage(state.message,action.message);

      return Object.assign({},state,{message: message});
      break;
    case 'LOAD_DOCUMENTS':
        console.log('Obteniendo los documentos nuevos');
        return Object.assign({},state,{promise: db.allDocs({include_docs: true})});
      break;
    case 'INSERT_MULTIPLE_DOCUMENTS':
      console.log('insertando multiples documentos');
      return Object.assign({},state,{documents: action.documents});
      break;
    case 'GET_DOCUMENTS':
      if(action.document){
        db.allDocs().then(
          function(response){
            console.log(response.rows[0]);
            db.get(response.rows[0].id).then(function(data){
              console.log(data);
            });
          }
        );
        //console.log(db.allDocs().then(function(response){console.log(response);}));
        console.log(db.get(action.document).then(function(data){console.log(data)}));
      }
      else{
        console.log(db.allDocs().then(function(response){console.log(response);}));
      }
      return state;
      break;
    /*case 'FINISH_WORK':
      return Object.assign({},state,{promise: null});
      break;*/
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
