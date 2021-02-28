// Import React dependencies.
import React, { useEffect, useMemo, useState } from 'react'
// Import the Slate editor factory.
import { createEditor, Value } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

const TextEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), [{text:"A paragraph goes here"}])

    const [value, setValue] = useState([])

    return (
        <Slate 
            editor={editor} 
            value={value}
            onChange={newValue => setValue(newValue)}
        >
            <Editable />
        </Slate>
    )
}

export default TextEditor;