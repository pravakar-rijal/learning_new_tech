import { Component } from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
    selector: 'editor',
    standalone: true,
    templateUrl: './editor.component.html',
    styleUrl: './editor.component.css'
})
export class EditorComponent {
    ngAfterViewInit() {
        monaco.editor.create(document.querySelector('#editorContainer')!, {
            value: `\\ Start coding here...`,
            language: `javascript`,
            theme: 'vs-dark',
            automaticLayout: true
        });
    }
}