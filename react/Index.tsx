/* eslint-disable no-console */
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { AwesomeObject, MyComponentProps } from './typings/global'
import { Spinner } from 'vtex.styleguide'

//Declare Handles for the react component to be accesible
const CSS_HANDLES = [
  'someHandle1',
  'someHandle2',
  'someHandle3',
  'someHandle4',
  'someHandle5',
  'someHandle6',
  'someHandle7',
] as const

const MyComponent: StorefrontFunctionComponent<MyComponentProps> = ({
  someString,
  awesomeArray,
  awesomeObjectArray,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { formatMessage } = useIntl()
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* Editable props on SiteEditor */}
      <div className={`${handles.someHandle1}`}>
        <p>{someString}</p>
      </div>

      {/* International string from messages framework */}
      <div className={`${handles.someHandle2}`}>
        <p>{formatMessage({ id: 'store/my-component.somelanguageString' })}</p>
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

      {/* Use of a custom array prop */}
      <div className={`${handles.someHandle6}`}>
        <ul>
          {awesomeArray?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Use of a custom object array prop */}
      <div className={`${handles.someHandle7}`}>
        {awesomeObjectArray?.map(({ someString, someInt, image }: AwesomeObject, index) => (
          <div key={index}>
            <p>{someString}</p>
            <p>{someInt}</p>
            <img src={image} alt={someString} />
          </div>
        ))}
      </div>
    </div>
  )
}

//This is the schema form that will render the editable props on SiteEditor
MyComponent.schema = {
  title: 'MyComponent Title',
  description: 'MyComponent description',
}

export default MyComponent
