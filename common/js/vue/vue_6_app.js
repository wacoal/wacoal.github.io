var demo = new Vue({
  el: '#demo',
  data: {
    modalData: {
      title: 'モーダルのタイトル',
      buttonText: 'OK',
      message: 'モーダルのメッセージ'
    },
    tagEditorOptions: {
      id: 'tagEditor',
      tags: ['JavaScript', 'MVVM', 'Vue.js', 'dsaf.js']
    }
  }
});
