"use client";

import {
  Bold,
  Heading2,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { ReactNode } from "react";
import { useState } from "react";

export function RichTextEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const [html, setHtml] = useState(defaultValue || "");
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-[var(--rose)] underline decoration-[var(--line)]",
        },
      }),
      Placeholder.configure({
        placeholder: "Write the full blog here...",
      }),
    ],
    content: defaultValue || "<p></p>",
      editorProps: {
        attributes: {
          class:
            "min-h-72 rounded-b-[0.5rem] bg-[var(--paper)] px-4 py-4 text-[var(--foreground)] outline-none",
        },
      },
    onUpdate({ editor: currentEditor }) {
      setHtml(currentEditor.getHTML());
    },
  });

  function setLink() {
    if (!editor) {
      return;
    }

    const existing = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt("Paste link URL", existing || "https://");

    if (href === null) {
      return;
    }

    if (!href.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  return (
    <div className="overflow-hidden rounded-[0.5rem] border border-[var(--line)] bg-[var(--paper)]">
      <input type="hidden" name={name} value={html} />
      <div className="flex flex-wrap gap-1 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_92%,var(--background))] p-2">
        <ToolButton
          active={editor?.isActive("bold")}
          label="Bold"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor?.isActive("italic")}
          label="Italic"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor?.isActive("heading", { level: 2 })}
          label="Heading"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor?.isActive("bulletList")}
          label="Bullet list"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor?.isActive("orderedList")}
          label="Numbered list"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor?.isActive("blockquote")}
          label="Quote"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor?.isActive("link")}
          label="Link"
          onClick={setLink}
        >
          <LinkIcon className="h-4 w-4" />
        </ToolButton>
        <span className="mx-1 h-8 w-px bg-[var(--line)]" />
        <ToolButton label="Undo" onClick={() => editor?.chain().focus().undo().run()}>
          <Undo2 className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Redo" onClick={() => editor?.chain().focus().redo().run()}>
          <Redo2 className="h-4 w-4" />
        </ToolButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function ToolButton({
  active,
  label,
  children,
  onClick,
}: {
  active?: boolean;
  label: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`grid h-9 w-9 place-items-center rounded-[0.45rem] border text-[var(--foreground)] transition ${
        active
          ? "border-[var(--clay)] bg-[color-mix(in_srgb,var(--clay)_24%,var(--paper))]"
          : "border-transparent hover:border-[var(--line)] hover:bg-[var(--background)]"
      }`}
    >
      {children}
    </button>
  );
}
