import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SimpleMDE from 'simplemde';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

var editor;

// almacena todo tipo de valores
var tempValues;

const App = React.createClass({

  componentDidMount: function(){
    var self = this;


    // Config editor
    editor = new SimpleMDE({
      element: document.getElementById("editor"),
      spellChecker: false,
      autosave: {
        enabled: false
      },
      toolbar: [
        'bold',
        'italic',
        'strikethrough',
        'heading',
        'heading-smaller',
        'heading-bigger',
        'code',
        'preview',
        '|',
        {
          name: 'save',
          className: 'fa fa-floppy-o',
          title: 'Save',
          action: function saveText(editor){self.props.save()}
        },
        {
          name: 'changeTitle',
          className: 'fa fa-pencil-square-o',
          title: 'Change Title',
          action: function changeTitle(editor){self.props.changeTitle()}
        },
        {
          name: 'pruebas',
          className: 'fa fa-pencil-square-o',
          title: 'Pruebas',
          action: function pruebas(editor){self.props.getDocuments()}
        },
        {
          name: 'Load document',
          className: 'fa fa-folder',
          title: 'Load a document',
          action: function loadDocument(editor){self.props.loadDocuments()}
        }
      ],
      shortcuts: {
        saveText: 'Cmd-S'
      }
    });

    // detect when somone is typing
    editor.codemirror.on("change", function(){
      self.props.keep({text: editor.value()});
    });
  },

  render: function(){
    var state = this.props;

    //var changeTitleModal;

    console.log('ESTE ES EL STATE QUE ESTA EN LA VISTA');
    console.log(state);
    // buttons changeTitleModal

    const changeTitleModalButton = [
      <FlatButton
        label="Save"
        primary={true}
        onClick={function(){
          state.changeTitle(tempValues);
        }}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={function(){state.changeTitle(true);}}
      />
    ];

    return(
      <MuiThemeProvider>
        <div>
          <div className='title'>{state.planeText.title}</div>
          <textarea id = 'editor'>
          </textarea>
          {/* this is the message*/}
          <Snackbar
            open={state.planeText.message.open}
            message={state.planeText.message.message}
            autoHideDuration={state.planeText.message.duration}
            bodyStyle={{textAlign: 'center'}}
          />
          {/* Change the title */}
          <Dialog
            title="Change title"
            actions={changeTitleModalButton}
            modal={false}
            open={state.planeText.changeTitle}
          >
            <TextField
              hintText="Write the title"
              fullWidth={true}
              onChange={function(e){tempValues = e.target.value}}
            />
          </Dialog>

          {/* Documents */}
          <Dialog
            title="Load a document"
            actions={changeTitleModalButton}
            modal={false}
            open={state.planeText.documents}
          >
            <TextField
              hintText="No es nada"
              fullWidth={true}
              onChange={function(e){tempValues = e.target.value}}
            />
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }

});

export default App;
