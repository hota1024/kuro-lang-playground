import { ControlledEditor, monaco } from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import { editor } from 'monaco-editor'

/**
 * EditorProps type.
 */
export type EditorProps = {
  /**
   * Value.
   */
  value: string

  /**
   * Code change handler.
   *
   * @param code Code.
   */
  onChange(code: string): void
}

/**
 * Editor component.
 */
export const Editor: React.FC<EditorProps> = (props) => {
  useEffect(() => {
    if (!process.browser) {
      return
    }

    monaco.init().then((monaco) => {
      monaco.languages.register({ id: 'kuro' })
      monaco.languages.setLanguageConfiguration('kuro', {
        wordPattern: /(-?\d*\.\d\w*)|([^`~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        comments: {
          lineComment: '//',
          blockComment: ['/*', '*/'],
        },

        brackets: [
          ['{', '}'],
          ['[', ']'],
          ['(', ')'],
        ],

        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"', notIn: ['string'] },
          { open: "'", close: "'", notIn: ['string', 'comment'] },
          { open: '`', close: '`', notIn: ['string', 'comment'] },
          { open: '/**', close: ' */', notIn: ['string'] },
        ],
      })
      monaco.languages.setMonarchTokensProvider('kuro', {
        defaultToken: 'invalid',
        tokenPostfix: '.kuro',

        keywords: [
          'let',
          'const',
          'if',
          'else',
          'break',
          'continue',
          'loop',
          'while',
          'for',
          'in',
          'incase',
          'fn',
        ],

        operators: [
          '<=',
          '>=',
          '==',
          '!=',
          '===',
          '!==',
          '=>',
          '+',
          '-',
          '**',
          '*',
          '/',
          '%',
          '!',
          '&&',
          '||',
          '=',
          '+=',
          '-=',
          '*=',
          '**=',
          '/=',
          '%=',
        ],

        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        digits: /\d+(_+\d+)*/,
        octaldigits: /[0-7]+(_+[0-7]+)*/,
        binarydigits: /[0-1]+(_+[0-1]+)*/,
        hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

        tokenizer: {
          root: [[/[{}]/, 'delimiter.bracket'], { include: 'common' }],

          common: [
            // identifiers and keywords
            [
              /[a-z_$][\w$]*/,
              {
                cases: {
                  '@keywords': 'keyword',
                  '@default': 'identifier',
                },
              },
            ],
            [/[A-Z][\w\$]*/, 'type.identifier'], // to show class names nicely
            // [/[A-Z][\w\$]*/, 'identifier'],

            // whitespace
            { include: '@whitespace' },

            // delimiters and operators
            [/[()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [/!(?=([^=]|$))/, 'delimiter'],
            [
              /@symbols/,
              {
                cases: {
                  '@operators': 'delimiter',
                  '@default': '',
                },
              },
            ],

            // numbers
            [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
            [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
            [/0[xX](@hexdigits)n?/, 'number.hex'],
            [/0[oO]?(@octaldigits)n?/, 'number.octal'],
            [/0[bB](@binarydigits)n?/, 'number.binary'],
            [/(@digits)n?/, 'number'],

            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],

            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
            [/'([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
            [/"/, 'string', '@string_double'],
            [/'/, 'string', '@string_single'],
            [/`/, 'string', '@string_backtick'],
          ],

          whitespace: [
            [/[ \t\r\n]+/, ''],
            [/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
          ],

          comment: [
            [/[^\/*]+/, 'comment'],
            [/\*\//, 'comment', '@pop'],
            [/[\/*]/, 'comment'],
          ],

          jsdoc: [
            [/[^\/*]+/, 'comment.doc'],
            [/\*\//, 'comment.doc', '@pop'],
            [/[\/*]/, 'comment.doc'],
          ],

          string_double: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop'],
          ],

          string_single: [
            [/[^\\']+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/'/, 'string', '@pop'],
          ],

          string_backtick: [
            [/\$\{/, { token: 'delimiter.bracket', next: '@bracketCounting' }],
            [/[^\\`$]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/`/, 'string', '@pop'],
          ],

          bracketCounting: [
            [/\{/, 'delimiter.bracket', '@bracketCounting'],
            [/\}/, 'delimiter.bracket', '@pop'],
            { include: 'common' },
          ],
        },
      } as any)
      console.log(monaco)
    })
  })

  const [, setEditor] = useState<editor.IStandaloneCodeEditor>()

  const onCodeChange = (_, value: string) => {
    props.onChange(value)
  }

  return (
    <>
      <ControlledEditor
        height="calc(100vh - 64px)"
        theme="dark"
        value={props.value}
        onChange={onCodeChange}
        editorDidMount={(_, editor) => setEditor(editor)}
        options={{
          fontSize: 20,
        }}
        language="kuro"
      />
    </>
  )
}
