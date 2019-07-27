import React from 'react'
import { render } from 'react-dom'
import diagram from 'diagrams/main.puml'

render(<img src={diagram} alt="diagram" />, document.getElementById('root'))
