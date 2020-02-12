import { document } from '@ephox/dom-globals';

declare const tinymce: any;

export default function () {
  const textarea = document.createElement('textarea');
  textarea.rows = 20;
  textarea.cols = 80;
  textarea.innerHTML = '<p>Bolt</p>';
  textarea.classList.add('tinymce');
  document.querySelector('#ephox-ui').appendChild(textarea);

  tinymce.init({
    selector: 'textarea',
    theme (editor, target) {
      const dom = tinymce.DOM;
      let editorContainer;

      editorContainer = dom.insertAfter(dom.create('div', { style: 'border: 1px solid gray' },
        '<div></div>'
      ), target);

      dom.setStyle(editorContainer, 'width', target.offsetWidth);
      return {
        editorContainer,
        iframeContainer: editorContainer.lastChild,
        iframeHeight: target.offsetHeight - editorContainer.firstChild.offsetHeight
      };
    },
    height: 600
  });
}
