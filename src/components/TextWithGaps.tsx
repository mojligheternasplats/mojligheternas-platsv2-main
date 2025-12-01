export function TextWithGaps({ text }: { text: string }) {
  const lines = text.split("\n");

  // group every 4 lines
  const chunks: string[][] = [];
  for (let i = 0; i < lines.length; i += 4) {
    chunks.push(lines.slice(i, i + 4));
  }

  return (
    <div className="space-y-10">
      {chunks.map((block, i) => (
        <div key={i} className="space-y-2 animate-slideUp">
          {block.map((line, idx) => (
            <p key={idx} className="leading-relaxed text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
