import { Mark, mergeAttributes } from '@tiptap/core'

export default Mark.create({
    name: 'modal-link',

    priority: 1000,

    keepOnSplit: false,

    addOptions() {
        return {
            HTMLAttributes: {
                class: 'modal-link',
                'data-link': null,
            },
        }
    },

    addAttributes() {
        return {
            'data-link': {
                default: null,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'span',
                getAttrs: node => (node).classList.contains('modal-link')
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },

    addCommands() {
        return {
            setModalLink: attributes => ({ chain }) => {
                return chain().setMark(this.name, attributes).run()
            },
            toggleModalLink: attributes => ({ chain }) => {
                return chain().toggleMark(this.name, attributes, { extendEmptyMarkRange: true }).run()
            },
            unsetModalLink: () => ({ chain }) => {
                return chain().unsetMark(this.name, { extendEmptyMarkRange: true }).run()
            },
        }
    }

});
