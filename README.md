# Boodo

<div align="center">
  <a href="https://online-whiteboard-boodo.web.app/">
    <img width="300" src="https://i.imgur.com/C14NHOF.png" alt="boodo logo" />
  </a>
  <h3>A simple online whiteboard tool that helps you express your thoughts in drawing</br> and collaborate with others in real-time from anywhere.</h3>
  <img width="800" src="https://i.imgur.com/4YJk5CT.gif" alt="cover" />
</div>
<p align="center">
  <b>
  Live Demo: https://online-whiteboard-boodo.web.app/
  </b>
</p>
<br/>
<p align="center">
  <b>
  Test Account
  </b>
</p>
<p align="center">
  Email: test@test.com
</p>
<p align="center">
  Password: test123
</p>


## Technique

| Technique           | Description                                           |
| ------------------- | ----------------------------------------------------- |
| React Hooks         | functional components, custom hook                    |
| React Router        | implements routing in SPA                             |
| Redux Toolkit       | manage global states                                  |
| Firebase            | Realtime Database, Storage, Authentication, Hosting   |
| SVG                 | draw vector-based graphics in XML format              |
| Third-Party Modules | roughjs, perferct-freehand, save-svg-as-png           |
| styled-components   | CSS-In-JS                                             |
| Prettier            | keep the coding style consistent and better formatted |
| ESLint              | help to check syntax, enhance development efficiency  |
| webpack             | bundle JavaScript files for usage in a browser        |
| Babel               | solve browser compatibility issues                    |

### React Components Structure

1. Shared React components design
2. Use Redux to manage global states
3. Use Portals to render the modal outside the DOM hierarchy of its parent component
   ![image](https://i.imgur.com/8q7ZOEw.png)

### Custom Hook

1. useDrawingHistory for the UndoRedo feature
2. useZoom for detecting pinch gestures on mobile devices to zoom the canvas

## Features and tools

- Users can sign in locally or use Google/ Facebook sign in
- Drawing tools: shapes, pencil, color palette, brush width
- Insert/ edit Text
- Attach images
- Change opacity
- Move elements
- Resize shapes and images
- Undo & Redo supported
- Zoom or move the canvas
- Collaborate in real-time by simply sharing the whiteboard's URL
- Every user's cursor is shown with different colors on the whiteboard while collaborating
- Users can type the name they want to display on other collaborators' screens
- Export the canvas as PNG or SVG files
- Clear the whole canvas
- Create/ delete boards in the console
- Mobile devices supported
- Keyboard shortcuts to work faster
  - | action | keyboard shortcut |
    | -------- | -------- |
    | Change tool | 1 ~ 7    |
    | Undo | Ctrl+Z   |
    | Redo | Ctrl + Shift + Z    |
    | Delete selected element |Backspace or Delete    |
    | Zoom canvas | press Ctrl key and scroll the mouse wheel    |
    | Move canvas | Hold spacebar while dragging or if the active tool is selection, press on the empty space then drag it   |
    

## Demo Videos



https://user-images.githubusercontent.com/87297350/173868255-ca7d17c6-8791-4fa9-bf8f-26640cf26b91.mov



https://user-images.githubusercontent.com/87297350/173868282-0c6839af-8de0-43c0-bc69-a3959f63faf4.mov





## Inspiration
The UI of whiteboard was inspired by [Excalidraw](https://excalidraw.com/).
