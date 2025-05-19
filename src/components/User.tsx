"use client";

export default function User({ content }: { content: string }) {
  return (
    <div className="py-4 flex justify-end">
      <div className="max-w-[75%] p-3 rounded-lg shadow-md bg-[var(--surface-c)] text-[var(--text-color)] rounded-br-none">
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
