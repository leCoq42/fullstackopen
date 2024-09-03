```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server adds the the new note to the notes array
    server-->>browser: redirect
    deactivate server

```
