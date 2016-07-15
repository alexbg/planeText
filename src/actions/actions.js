export default{
  save: function(){
    return {
      type: 'SAVE'
    }
  },
  message: function(message){
    return {
      type: 'MESSAGE',
      message: message
    }
  },
  new: function(){
    return {
      type: 'NEW'
    }
  },
  delete: function(id){
    return{
      type: 'DELETE',
      id: id
    }
  },
  export: function(format){
    return {
      type: 'EXPORT',
      format: format
    }
  },
  keep: function(text){
    return {
      type: 'KEEP',
      text: text
    }
  },
  changeTitle: function(title){
    return {
      type: 'CHANGE_TITLE',
      title: title
    }
  },
  getDocuments: function(document){
    return {
      type: 'GET_DOCUMENTS',
      document: document
    }
  },
  insertMultipleDocument: function(documents){
    return{
      type: 'INSERT_MULTIPLE_DOCUMENTS',
      documents: documents
    }
  },
  loadDocuments: function(){
    var self = this;
    return function(dispatch,getState){
      dispatch({type: 'LOAD_DOCUMENTS'});
      //console.log(getState());
      if(getState().planeText.promise){
        getState().planeText.promise.then(function(documents){
          dispatch(self.insertMultipleDocument(documents));
          //dispatch(self.finish());
        });
      }
    }
  },
  finish: function(){
    return {
      type: 'FINISH_WORK'
    }
  },
  saveInDisk: function(){
    var self = this;
    return function(dispatch,getState){

      dispatch(self.save());
      getState().planeText.promise.then(function(document){
        console.log('ESTE ES EL DOCUMENTO GUARDADO');
        console.log(document);
        dispatch(self.insertActualDocument(document));
        dispatch(self.message('SAVED'));
        //dispatch(self.finish());
      });

    }
  },
  notLoadDocument: function(){
    return {
      type: 'NOT_LOAD_DOCUMENT'
    }
  },
  loadADocument: function(id){
    var self = this;
    return function(dispatch,getState,id){
      console.log('ESTO ES ID: '+id);
      dispatch({type:'LOAD_A_DOCUMENT',id:id});
      getState().planeText.promise.then(function(document){
        dispatch(self.insertActualDocument(document));
      });
    }
  },
  insertActualDocument: function(document){
    return {
      type: 'INSERT_ACTUAL_DOCUMENT',
      document: document
    }
  },
  newDocument: function(){
    return {
      type: 'NEW_DOCUMENT'
    }
  }
}
