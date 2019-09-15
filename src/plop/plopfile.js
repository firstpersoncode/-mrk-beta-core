const prettier = require('prettier')

module.exports = (plop) => {
    const prettierConfig = prettier.resolveConfig.sync(__dirname)
    plop.load('plop-prettier', prettierConfig)

    plop.setGenerator('React Component', {
        description: 'Create a new React component',
        prompts: [
            {
                type: 'prompt',
                name: 'componentName',
                message: 'Name of your component:',
            },
            {
                type: 'confirm',
                name: 'connectToRedux',
                message: 'Do you want the component to be connected to Redux?',
                default: true,
            },
        ],
        actions: (answers) => {
            const actions = [
                {
                    type: 'pretty-add',
                    path:
                        './src/app/components/{{properCase componentName}}/{{properCase componentName}}.tsx',
                    templateFile: './component/component.js.plop',
                },
                {
                    type: 'pretty-add',
                    path:
                        './src/app/components/{{properCase componentName}}/{{properCase componentName}}.test.tsx',
                    templateFile: './component/component.test.js.plop',
                },
            ]

            if (answers.connectToRedux) {
                actions.push({
                    type: 'pretty-add',
                    path: './src/app/components/{{properCase componentName}}/index.ts',
                    templateFile: './component/index.connected.js.plop',
                })
            } else {
                actions.push({
                    type: 'pretty-add',
                    path: './src/app/components/{{properCase componentName}}/index.ts',
                    templateFile: './component/index.unconnected.js.plop',
                })
            }

            return actions
        },
    })

    plop.setGenerator('Redux Reducer', {
        description: 'Generate a new Redux reducer (reducer, actions, selectors …)',
        prompts: [
            {
                type: 'prompt',
                name: 'reducerName',
                message: 'Name of your reducer (e.g. "Calendar Event" or "Vehicle")',
            },
        ],
        actions: () => {
            const actions = [
                {
                    type: 'pretty-add',
                    path: './src/store/{{camelCase reducerName}}/actions.ts',
                    templateFile: './reducer/actions.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/store/{{camelCase reducerName}}/actions.test.ts',
                    templateFile: './reducer/actions.test.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/store/{{camelCase reducerName}}/reducer.ts',
                    templateFile: './reducer/reducer.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/store/{{camelCase reducerName}}/reducer.test.ts',
                    templateFile: './reducer/reducer.test.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/store/{{camelCase reducerName}}/selectors.ts',
                    templateFile: './reducer/selectors.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/store/{{camelCase reducerName}}/selectors.test.ts',
                    templateFile: './reducer/selectors.test.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/store/{{camelCase reducerName}}/types.ts',
                    templateFile: './reducer/types.js.plop',
                },
            ]

            return actions
        },
    })
}
