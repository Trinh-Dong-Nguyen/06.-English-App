import React from "react"

interface MatchingQuestionProps {
  text: string
}

export const MatchingQuestion: React.FC<MatchingQuestionProps> = ({ text }) => {
  // Function to parse HTML and replace the placeholder with an <input> tag
  const processHTMLContent = (htmlContent: string) => {
    const placeholder = "…………………"

    // Use the browser's DOMParser to parse the HTML content
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, "text/html")

    // Walk through all text nodes and modify content
    const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null)
    while (walker.nextNode()) {
      const node = walker.currentNode as Text

      if (node.textContent?.includes(placeholder)) {
        // If placeholder exists, split and replace it with an input
        const parts = node.textContent.split(placeholder)
        const fragment = document.createDocumentFragment()

        parts.forEach((part, index) => {
          fragment.appendChild(document.createTextNode(part))
          if (index < parts.length - 1) {
            const input = document.createElement("input")
            input.type = "text"
            input.placeholder = ""
            input.className =
              "inline h-[30px] w-[100px] rounded-md border-2 border-comboboxBorder bg-white text-black mx-2"
            fragment.appendChild(input)
          }
        })
        node.replaceWith(fragment)
      } else if (node.textContent?.trim().match(/^\d+\.\s/)) {
        // If no placeholder but starts with "4. ", insert input after 2-3 characters
        const match = node.textContent.match(/^(\d+\.\s)(.*)/)
        if (match) {
          const fragment = document.createDocumentFragment()
          fragment.appendChild(document.createTextNode(match[1])) // "4. "
          const input = document.createElement("input")
          input.type = "text"
          input.placeholder = ""
          input.className =
            "inline h-[30px] w-[100px] rounded-md border-2 border-comboboxBorder bg-white text-black mx-2"
          fragment.appendChild(input)
          fragment.appendChild(document.createTextNode(match[2])) // Remaining text
          node.replaceWith(fragment)
        }
      }
    }

    // Return the modified HTML as a React-compatible structure
    return <div dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }} />
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="text-lg text-black">{processHTMLContent(text)}</div>
    </div>
  )
}
