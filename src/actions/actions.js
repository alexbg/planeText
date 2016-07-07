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
  saveInDisk: function(){
    var self = this;
    return function(dispatch,getState){

      dispatch(self.save());
      getState().planeText.promise.then(function(){
        dispatch(self.message('SAVED'));
      });

    }
  }
}
