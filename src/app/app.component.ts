import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @ViewChild('editor') editor!: ElementRef<HTMLElement>;

  title = 'Gmail API Example';

  color : any ;
  font_size= ['5', '4','3'];
  font_list = [
    'Arial',
    'Verdana',
    'Times New Roman',
    'Garamond',
    'Georgia',
    'Courier New',
    'Cursive',
  ];

  buttons : modelButton[] = [
    {
      id: 'undo' ,
      class:'option-button format',
      icono: 'rotate_left',
      malTooltip:'Deshacer'
    },
    {
      id: 'redo' ,
      class:'option-button format',
      icono: 'rotate_right',
      malTooltip:'Rehacer'
    },
    {
      id: 'bold' ,
      class:'option-button format',
      icono: 'format_bold',
      malTooltip:'Negrita'
    },
    {
      id: 'italic' ,
      class:'option-button format',
      icono: 'format_italic',
      malTooltip:'Cursiva'
    },
    {
      id: 'underline' ,
      class:'option-button format',
      icono: 'format_underline',
      malTooltip:'Subrayado'
    },
    // {
    //   id: 'strikethrough' ,
    //   class:'option-button format',
    //   icono: 'format_strikethrough',
    //   malTooltip:'Tachar'
    // },
    {
      id: 'insertOrderedList' ,
      class:'option-button format',
      icono: 'format_list_numbered',
      malTooltip:'Lista numerada'
    },
    {
      id: 'insertUnorderedList' ,
      class:'option-button format',
      icono: 'format_list_bulleted',
      malTooltip:'Lista con viñetas'
    },
    {
      id: 'createLink' ,
      class:'option-button format',
      icono: 'insert_link',
      malTooltip:'Insertar enlace'
    },
    {
      id: 'justifyLeft' ,
      class:'option-button align',
      icono: 'format_align_left',
      malTooltip:'Alinear texto a la izquierda'
    },
    {
      id: 'justifyCenter' ,
      class:'option-button align',
      icono: 'format_align_center',
      malTooltip:'Alinear texto al centro'
    },
    {
      id: 'justifyRight' ,
      class:'option-button align',
      icono: 'format_align_right',
      malTooltip:'Alinear texto a la derecha'
    },
    {
      id: 'insertImage' ,
      class:'option-button align',
      icono: 'add_photo_alternate',
      malTooltip:'Insertar imagen'
    },
    {
      id: 'file' ,
      class:'option-button align',
      icono: 'attach_file',
      malTooltip:'Adjuntar archivo'
    },
    {
      id: 'foreColor' ,
      class:'option-button align',
      icono: 'format_color_text',
      malTooltip:'Color del texto'
    },
    {
      id: 'backColor' ,
      class:'option-button align',
      icono: 'colorize',
      malTooltip:'Color de resaltado'
    },

  ]

  array_file : File [] = []


  // prueba
  selectedImage!: HTMLImageElement;
  mouseX!: number;
  mouseY!: number;


  constructor() {}

  modifyText(command: any, defaultUi: any, value :any ) {
    value != null ? value = value.value : null;
    document.execCommand(command, defaultUi, value);
  }

  validateInput(value : string ):boolean{
    const array = ['file','foreColor','backColor','insertImage']
    return array.includes(value)
  }

  inputClick(id : string){
    const input = document.getElementById(id + "-input")
    input?.click();
  }

  insertFile(event : any){
    const file : File = event.target.files[0];
    this.array_file.push(file)
  }

  deleteFile(i:number){
    this.array_file.splice(i,1)
  }

  insertImage(event : any){
    const file: File = event.target.files[0];

    if (file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageSrc = reader.result as string;
        const image = new Image();
        image.src = imageSrc;

        image.onload = () => {
          this.editor.nativeElement.focus();
          document.execCommand('insertHTML', false, `<img src="${imageSrc}" alt="${file.name}">`);
          this.setResizable();
        };
      };
      reader.readAsDataURL(file);
    }
  }

  setResizable() {
    const images = this.editor.nativeElement.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      img.style.position = 'relative';
      img.style.width = '100%';
      img.style.maxWidth = '400px'; // ajusta el tamaño máximo aquí
      img.style.height = 'auto';
    }
  }


  resizeImage(direction: 'increase' | 'decrease') {
    const images = this.editor.nativeElement.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const currentWidth = img.clientWidth;
      const newWidth = direction === 'increase' ? currentWidth + 10 : currentWidth - 10;
      if (newWidth > 0 && newWidth <= 400) { // ajusta el tamaño máximo aquí
        img.style.width = `${newWidth}px`;
      }
    }
  }
}

export interface modelButton {
  id: string;
  class: string;
  icono: string;
  malTooltip: string;
}
