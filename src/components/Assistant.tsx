"use client";

export default function Assistant({ content }: { content: string }) {
  return (
    <div className="py-4 flex justify-start">
      <div className="max-w-[75%] p-3 text-[var(--text-color)]">
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
