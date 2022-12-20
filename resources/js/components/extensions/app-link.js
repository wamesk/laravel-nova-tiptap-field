import { Mark, mergeAttributes } from '@tiptap/core'

export default Mark.create({
    name: 'app-link',

    priority: 1000,

    keepOnSplit: false,

    addOptions() {
        return {
            HTMLAttributes: {
                class: 'app-link',
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
                getAttrs: node => (node).classList.contains('app-link')
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },

    addCommands() {
        return {
            setAppLink: attributes => ({ chain }) => {
                return chain().setMark(this.name, attributes).run()
            },
            toggleAppLink: attributes => ({ chain }) => {
                return chain().toggleMark(this.name, attributes, { extendEmptyMarkRange: true }).run()
            },
            unsetAppLink: () => ({ chain }) => {
                return chain().unsetMark(this.name, { extendEmptyMarkRange: true }).run()
            },
        }
    }

});
