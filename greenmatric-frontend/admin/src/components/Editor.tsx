"use client";

import { useEditor, EditorContent, type Editor as TipTapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function ToolBtn({ editor, cmd, active, label }: { editor: TipTapEditor; cmd: () => void; active: boolean; label: string }) {
  return (
    <button type="button" onMouseDown={(e) => { e.preventDefault(); cmd(); }}
      className={`rounded px-2 py-1 text-sm font-medium ${active ? "bg-emerald-100 text-emerald-700" : "text-slate-600 hover:bg-slate-100"}`}>
      {label}
    </button>
  );
}

export function Editor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[320px] p-4 text-sm leading-relaxed focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-4 [&_p]:mt-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-emerald-600 [&_a]:underline",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return <div className="min-h-[360px] rounded-lg border border-slate-300 bg-white" />;

  return (
    <div className="rounded-lg border border-slate-300 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 p-2">
        <ToolBtn editor={editor} label="B" active={editor.isActive("bold")} cmd={() => editor.chain().focus().toggleBold().run()} />
        <ToolBtn editor={editor} label="I" active={editor.isActive("italic")} cmd={() => editor.chain().focus().toggleItalic().run()} />
        <ToolBtn editor={editor} label="H2" active={editor.isActive("heading", { level: 2 })} cmd={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
        <ToolBtn editor={editor} label="• List" active={editor.isActive("bulletList")} cmd={() => editor.chain().focus().toggleBulletList().run()} />
        <ToolBtn editor={editor} label="1. List" active={editor.isActive("orderedList")} cmd={() => editor.chain().focus().toggleOrderedList().run()} />
        <ToolBtn editor={editor} label="Quote" active={editor.isActive("blockquote")} cmd={() => editor.chain().focus().toggleBlockquote().run()} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
