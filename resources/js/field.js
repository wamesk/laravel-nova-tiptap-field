import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'

Nova.booting((app, store) => {
  app.component('index-tiptap', IndexField)
  app.component('detail-tiptap', DetailField)
  app.component('form-tiptap', FormField)
})
