<template>
  <DefaultField
    :field="field"
    :errors="errors"
    :show-help-text="showHelpText"
    :full-width-content="fullWidthContent"
  >
    <template #field>
        <div class="toolbar">
            <div class="toolbar-group">
                <span @click="code ? null : editor.chain().focus().undo().run()" :disabled="!editor.can().undo() || code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                </span>

                <span @click="code ? null : editor.chain().focus().redo().run()" :disabled="!editor.can().redo() || code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                </span>
            </div>

            <div class="toolbar-group">
                <span @click="code ? null : editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" :disabled="code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"/></svg>
                </span>

                <span @click="code ? null : editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" :disabled="code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"/></svg>
                </span>

                <span @click="code ? null : editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }" :disabled="code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M16 64c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H128V224c0 53 43 96 96 96s96-43 96-96V96H304c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"/></svg>
                </span>

                <span @click="code ? null : editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" :disabled="code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M161.3 144c3.2-17.2 14-30.1 33.7-38.6c21.1-9 51.8-12.3 88.6-6.5c11.9 1.9 48.8 9.1 60.1 12c17.1 4.5 34.6-5.6 39.2-22.7s-5.6-34.6-22.7-39.2c-14.3-3.8-53.6-11.4-66.6-13.4c-44.7-7-88.3-4.2-123.7 10.9c-36.5 15.6-64.4 44.8-71.8 87.3c-.1 .6-.2 1.1-.2 1.7c-2.8 23.9 .5 45.6 10.1 64.6c4.5 9 10.2 16.9 16.7 23.9H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H270.1c-.1 0-.3-.1-.4-.1l-1.1-.3c-36-10.8-65.2-19.6-85.2-33.1c-9.3-6.3-15-12.6-18.2-19.1c-3.1-6.1-5.2-14.6-3.8-27.4zM348.9 337.2c2.7 6.5 4.4 15.8 1.9 30.1c-3 17.6-13.8 30.8-33.9 39.4c-21.1 9-51.7 12.3-88.5 6.5c-18-2.9-49.1-13.5-74.4-22.1c-5.6-1.9-11-3.7-15.9-5.4c-16.8-5.6-34.9 3.5-40.5 20.3s3.5 34.9 20.3 40.5c3.6 1.2 7.9 2.7 12.7 4.3l0 0 0 0c24.9 8.5 63.6 21.7 87.6 25.6l0 0 .2 0c44.7 7 88.3 4.2 123.7-10.9c36.5-15.6 64.4-44.8 71.8-87.3c3.6-21 2.7-40.4-3.1-58.1H335.1c7 5.6 11.4 11.2 13.9 17.2z"/></svg>
                </span>
            </div>

            <div class="toolbar-group">
                <span @click="fontSizeDropdownToggle" :class="{ 'is-active': hasFontSize }" :disabled="code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M32 32C14.3 32 0 46.3 0 64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64l0 320H96c-17.7 0-32 14.3-32 32s14.3 32 32 32H224c17.7 0 32-14.3 32-32s-14.3-32-32-32H192l0-320h64v32c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H160 32zm470.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8h32V352H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H512V160h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64z"/></svg>
                </span>

                <div v-show="fontSizeDropdown" class="toolbar-dropdown">
                    <ul>
                        <li @click="fontSize('normal')" :class="{ 'is-active': !hasFontSize }">
                            Normal text
                        </li>
                        <li @click="fontSize('small')" :class="{ 'is-active': editor.isActive('small') }">
                            Small text
                        </li>
                        <li @click="fontSize('superscript')" :class="{ 'is-active': editor.isActive('superscript') }">
                            Superscript
                        </li>
                        <li @click="fontSize('subscript')" :class="{ 'is-active': editor.isActive('subscript') }">
                            Subscript
                        </li>
                    </ul>
                </div>
            </div>

<!--            <div class="toolbar-group">-->
<!--                <span @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">-->
<!--                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>-->
<!--                </span>-->

<!--                <span @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">-->
<!--                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z"/></svg>-->
<!--                </span>-->

<!--                <span @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">-->
<!--                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 64c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>-->
<!--                </span>-->

<!--                <span @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">-->
<!--                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"/></svg>-->
<!--                </span>-->
<!--            </div>-->

            <div class="toolbar-group">
                <span @click="linkDropdownToggle" :class="{ 'is-active': hasLink }" :disabled="code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>
                </span>

                <span v-show="hasLink" @click="removeLink" :disabled="code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L489.3 358.2l90.5-90.5c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114l-96 96-31.9-25C430.9 239.6 420.1 175.1 377 132c-52.2-52.3-134.5-56.2-191.3-11.7L38.8 5.1zM239 162c30.1-14.9 67.7-9.9 92.8 15.3c20 20 27.5 48.3 21.7 74.5L239 162zM406.6 416.4L220.9 270c-2.1 39.8 12.2 80.1 42.2 110c38.9 38.9 94.4 51 143.6 36.3zm-290-228.5L60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5l61.8-61.8-50.6-39.9z"/></svg>
                </span>

                <div v-show="linkDropdown" class="toolbar-dropdown">
                    <ul>
                        <li @click="setAppLink" :class="{ 'is-active': editor.isActive('app-link') }">
                            App link
                        </li>

                        <li @click="setModalLink" :class="{ 'is-active': editor.isActive('modal-link') }">
                            Modal link
                        </li>

                        <li @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
                            External link
                        </li>
                    </ul>
                </div>
            </div>

            <div class="toolbar-group">
                <span @click="code ? null : editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }" :disabled="code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 144c26.5 0 48-21.5 48-48s-21.5-48-48-48S16 69.5 16 96s21.5 48 48 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm48-208c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/></svg>
                </span>

                <span @click="code ? null : editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }" :disabled="code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
                </span>

                <span @click="code ? null : editor.chain().focus().setHorizontalRule().run()" :disabled="code">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                </span>
            </div>

            <div class="toolbar-group">
                <span @click="codeToggle" :class="{ 'is-active': code }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>
                </span>
            </div>
        </div>

        <div class="editor">
            <CodeEditor
                v-if="code"
                v-model="value"
                :languages="[['vbscript-html', 'HTML']]"
                :wrap_code="true"
                :hide_header="true"
                :display_language="false"
                width="100%"
                :autofocus="true"
            />
            <EditorContent v-else :editor="editor" class="w-full h-auto p-0 block form-control form-input form-control-bordered component-editor-content" />
        </div>
    </template>
  </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Small from './extensions/small'
import AppLink from './extensions/app-link'
import ModalLink from './extensions/modal-link'
import CodeEditor from 'simple-code-editor'

export default {
    mixins: [FormField, HandlesValidationErrors],

    components: {
        CodeEditor,
        EditorContent
    },

    props: ['resourceName', 'resourceId', 'field'],

    data() {
        return {
            editor: null,
            content: null,
            code: false,
            linkDropdown: false,
            fontSizeDropdown: false
        }
    },

    mounted() {
        let PlaceholderConf = Placeholder.configure({
            placeholder: this.placeholder,
        })

        let LinkConf = Link.configure({
            openOnClick: false,
            linkOnPaste: true,
            autolink: true,
            HTMLAttributes: { target: '_system', rel: null },
        })

        let TextAlignConf = TextAlign.configure({
            types: ['heading', 'paragraph'],
        })

        this.editor = new Editor({
            content: this.value,
            extensions: [
                LinkConf,
                PlaceholderConf,
                StarterKit,
                Subscript,
                Superscript,
                TextAlignConf,
                TextStyle,
                Underline,
                Small,
                AppLink,
                ModalLink,
            ],
            onUpdate: (transaction) => {
                this.value = this.editor.getHTML()
            }
        })
    },

    beforeUnmount() {
        this.editor.destroy()
    },

    methods: {
        codeToggle() {
            this.closeOtherDropdowns('all')
            this.code = this.code ? false : true

            if (this.code) {
                this.value = this.editor.getHTML()
            } else {
                this.editor.commands.setContent(this.value)
            }
        },

        closeOtherDropdowns(name) {
            if (name !== 'fontSize') this.fontSizeDropdown = false
            if (name !== 'link') this.linkDropdown = false
        },

        // FontSize
        fontSizeDropdownToggle() {
            if (this.code) return

            this.closeOtherDropdowns('fontSize')
            this.fontSizeDropdown = this.fontSizeDropdown ? false : true
        },

        fontSize(type) {
            this.fontSizeDropdownToggle()

            if (type === 'normal') {
                this.editor.chain().focus().unsetSmall().run()
                this.editor.chain().focus().unsetSuperscript().run()
                this.editor.chain().focus().unsetSubscript().run()
            } else if (type === 'small') {
                this.editor.chain().focus().toggleSmall().run()
            } else if (type === 'superscript') {
                this.editor.chain().focus().toggleSuperscript().run()
            } else if (type === 'subscript') {
                this.editor.chain().focus().toggleSubscript().run()
            }
        },

        // Link
        linkDropdownToggle() {
            if (this.code) return

            this.closeOtherDropdowns('link')
            this.linkDropdown = this.linkDropdown ? false : true
        },

        removeLink() {
            this.editor.chain().focus().unsetAppLink().run()
            this.editor.chain().focus().unsetModalLink().run()
            this.editor.chain().focus().unsetLink().run()
        },

        setLink() {
            this.linkDropdownToggle()

            const previousUrl = this.editor.getAttributes('link').href
            const url = window.prompt('URL', previousUrl)

            if (url === null) return
            if (url === '') {
                this.editor.chain().focus().extendMarkRange('link').unsetLink().run()
                return
            }

            this.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        },

        setAppLink() {
            this.linkDropdownToggle()

            const previousUrl = this.editor.getAttributes('app-link')['data-link']
            const url = window.prompt('URL', previousUrl)

            if (url === null) return
            if (url === '') {
                this.editor.chain().focus().extendMarkRange('app-link').unsetAppLink().run()
                return
            }

            this.editor.chain().focus().extendMarkRange('app-link').setAppLink({ 'data-link': url }).run()
        },

        setModalLink() {
            this.linkDropdownToggle()

            const previousUrl = this.editor.getAttributes('modal-link')['data-link']
            const url = window.prompt('URL', previousUrl)

            if (url === null) return
            if (url === '') {
                this.editor.chain().focus().extendMarkRange('modal-link').unsetModalLink().run()
                return
            }

            this.editor.chain().focus().extendMarkRange('modal-link').setModalLink({ 'data-link': url }).run()
        },

        /**
         * Set the initial, internal value for the field.
         */
        setInitialValue() {
            this.value = this.field.value || ''
        },

        /**
        * Fill the given FormData object with the field's internal value.
        */
        fill(formData) {
            formData.append(this.field.attribute, this.value || '')
        },
    },

    computed: {
        placeholder() {
            return (this.currentField.placeholder || this.field.name) + '…';
        },

        hasLink() {
            return this.editor.isActive('app-link') || this.editor.isActive('modal-link') || this.editor.isActive('link');
        },

        hasFontSize() {
            return this.editor.isActive('small') || this.editor.isActive('superscript') || this.editor.isActive('subscript');
        },
    }
}
</script>
