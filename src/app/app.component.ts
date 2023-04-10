import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Gmail API Example';

  font_size= ['H1', 'H2', 'H3', 'H4', 'H5'];
  font_list = [
    'Arial',
    'Verdana',
    'Times New Roman',
    'Garamond',
    'Georgia',
    'Courier New',
    'cursive',
  ];
  buttons : modelButton[] = [
    {
      id: 'bold' ,
      class:'option-button format',
      icono: 'format_bold'
    },
    {
      id: 'italic' ,
      class:'option-button format',
      icono: 'format_italic'
    },
    {
      id: 'underline' ,
      class:'option-button format',
      icono: 'format_underline'
    },
    {
      id: 'strikethrough' ,
      class:'option-button format',
      icono: 'format_strikethrough'
    },
    {
      id: 'insertOrderedList' ,
      class:'option-button format',
      icono: 'format_list_numbered'
    },
    {
      id: 'insertUnorderedList' ,
      class:'option-button format',
      icono: 'format_list_bulleted'
    },
    {
      id: 'undo' ,
      class:'option-button format',
      icono: 'rotate_left'
    },
    {
      id: 'redo' ,
      class:'option-button format',
      icono: 'rotate_right'
    },
    {
      id: 'createLink' ,
      class:'option-button format',
      icono: 'insert_link'
    },
    {
      id: 'justifyLeft' ,
      class:'option-button align',
      icono: 'format_align_left'
    },
    {
      id: 'justifyCenter' ,
      class:'option-button align',
      icono: 'format_align_center'
    },
    {
      id: 'justifyRight' ,
      class:'option-button align',
      icono: 'format_align_right'
    },
    {
      id: 'justifyFull' ,
      class:'option-button align',
      icono: 'format_align_justify'
    },
  ]

  constructor() {}

  //main logic
  modifyText(command: any, defaultUi: any, value :any ) {
    value != null ? value = value.value : null
    document.execCommand(command, defaultUi, value);
  }

  //Highlight clicked button
  highlighter(className: any, needsRemoval: any) {
    className.forEach((button: any) => {
      button.addEventListener('click', () => {
        //needsRemoval = true means only one button should be highlight and other would be normal
        if (needsRemoval) {
          let alreadyActive = false;
          //If currently clicked button is already active
          if (button.classList.contains('active')) {
            alreadyActive = true;
          }
          //Remove highlight from other buttons
          this.highlighterRemover(className);
          if (!alreadyActive) {
            //highlight clicked button
            button.classList.add('active');
          }
        } else {
          //if other buttons can be highlighted
          button.classList.toggle('active');
        }
      });
    });
  }

  highlighterRemover(className: any) {
    className.forEach((button: any) => {
      button.classList.remove('active');
    });
  }
}

export interface modelButton {
  id: string;
  class: string;
  icono: string;
}
