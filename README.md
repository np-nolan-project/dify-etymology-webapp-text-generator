# Etymology Lookup

An English etymology lookup tool that analyzes word origins and structures using AI. It identifies prefixes, roots, suffixes, historical development, and related words.

## Features

- Analyze English word origins.
- Identify prefixes, roots, and suffixes.
- Display historical development of words.
- Find related words with etymological connections.
- Render structured Markdown output.
- Copy analysis results to the clipboard.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | CSS, SCSS |
| Markdown Rendering | React Markdown |
| Backend API | Next.js API Routes |
| AI Workflow | Dify |
| LLM Provider | Groq |
| Deployment | Vercel |
| Source Control | GitHub |

## Architecture

```mermaid
flowchart LR
    subgraph SourceControl["Source Control"]
        GITHUB["GitHub Repository"]
    end

    subgraph Deployment["Deployment Layer"]
        subgraph Frontend["Frontend"]
            UI["UI"]
            API["Next.js API Route"]
            UI --> API
            API --> UI
        end
        VERCEL["Vercel"]
    end

    subgraph Dify["Workflow Layer"]
        WORKFLOW["Dify Workflow"]
    end

    subgraph Provider["AI Provider"]
        MODEL["Groq / Google / OpenAI / ..."]
    end
    
    GITHUB -->|Source Code / Push Trigger| VERCEL
    API -->|API Request| WORKFLOW
    WORKFLOW -->|API Response| API
    WORKFLOW ---|Model API| MODEL
```

### Workflow Layer

```mermaid
flowchart LR

    START("Input")
    LLM_CHECK["Input Checker"]
    IN_CHECK{"Judger"}
    LLM_COMP["Components Finder"]
    LLM_HP["Historical Path Finder"]
    LLM_RW["Related Words Finder"]
    MID_CHECK{"Judger"}
    LLM_FORM["Formatter"]
    OUT_CHECK{{"Output Checker"}}
    END("Output")

    style LLM_CHECK stroke:blue;
    style LLM_COMP stroke:blue;
    style LLM_HP stroke:blue;
    style LLM_RW stroke:blue;
    style LLM_FORM stroke:blue;
    style IN_CHECK stroke:green;
    style MID_CHECK stroke:green;
    style OUT_CHECK stroke:green;
    
    START --> LLM_CHECK
    LLM_CHECK --> IN_CHECK
    IN_CHECK --> LLM_COMP
    IN_CHECK --> LLM_HP
    IN_CHECK -.-> |ERR: ErrCode 1| END
    LLM_COMP --> LLM_RW
    LLM_HP --> MID_CHECK
    LLM_RW --> MID_CHECK
    MID_CHECK --> LLM_FORM
    MID_CHECK -.-> |ERR: ErrCode 2| END
    LLM_FORM --> OUT_CHECK
    OUT_CHECK --> END
    OUT_CHECK -.-> |ERR: ErrCode 3| END

    subgraph LEGEND["Diagram Legend"]
        LLM["LLM"]
        LOGIC["Logic"]

        style LLM stroke:blue;
        style LOGIC stroke:green;
    end
    style LEGEND stroke:white;
```

## Project Structure

```text
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── api/
│   │   └── workflows/
│   │       └── run/
│   │           └── route.ts
│   ├── components/
│   │   ├── index.tsx
│   │   └── etymology-layout/
│   │       ├── types/
│   │       │   └── etymology.ts
│   │       ├── etymology.tsx
│   │       ├── components/
│   │       │   ├── InputPanel.tsx
│   │       │   ├── OutputPanel.tsx
│   │       │   └── MarkdownOutput.tsx
│   │       ├── constants/
│   │       │   └── code.ts
│   │       └── utils/
│   │           ├── error.ts
│   │           └── validation.ts
│   └── styles/
│       ├── globals.css
│       ├── markdown.scss
│       └── etymology.css
├── package.json
├── tsconfig.json
└── README.md
```
