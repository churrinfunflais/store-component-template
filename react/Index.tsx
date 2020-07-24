/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { MyComponentProps } from './typings/global'
import axios from 'axios'
import { Spinner } from 'vtex.styleguide'

//Declare Handles for the react component to be accesible
const CSS_HANDLES = [
  'someHandle1',
  'someHandle2',
  'someHandle3',
  'someHandle4',
  'someHandle5',
] as const

const MyComponent: StorefrontFunctionComponent<MyComponentProps> = ({
  someString,
  intl,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  const [count, setCount] = useState(0)
  let [orderFormId, setOrderFormId] = useState()

  //Get current Id from Session API
  useEffect(() => {
    async function fetchData() {
      const {
        data: { id },
      } = await axios({
        url: '/api/sessions?items=*',
        method: 'GET',
      })

      setOrderFormId(id)
    }

    fetchData()
  })

  return (
    <div>
      {/* Editable props on SiteEditor */}
      <div className={`${handles.someHandle1}`}>
        <p>{someString}</p>
      </div>

      {/* International string from messages framework */}
      <div className={`${handles.someHandle2}`}>
        <p>
          {intl.formatMessage({ id: 'store/my-component.somelanguageString' })}
        </p>
      </div>

      {/* Get orderFormId from hook */}
      <div className={`${handles.someHandle3}`}>
        <p>{orderFormId}</p>
      </div>

      {/* Use of a ReactHook */}
      <div className={`${handles.someHandle4}`}>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>

      {/* Use of a VTEX StyleGuide https://styleguide.vtex.com/*/}
      <div className={`${handles.someHandle5}`}>
        <p>
          <Spinner />
        </p>
      </div>
    </div>
  )
}

//This is the schema form that will render the editable props on SiteEditor
MyComponent.schema = {
  title: 'MyComponent Title',
  description: 'MyComponent description',
  type: 'object',
  properties: {
    someString: {
      title: 'SomeString Title',
      description: 'editor.my-component.someString.description',
      type: 'string',
      default: 'SomeString default value',
    },
  },
}

export default injectIntl(MyComponent)
