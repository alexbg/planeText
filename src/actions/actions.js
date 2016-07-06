export default{
  save: function(){
    return {
      type: 'SAVE'
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
  }
}
