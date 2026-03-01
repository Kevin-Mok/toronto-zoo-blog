interface TagPillProps {
  tag: string;
}

export function TagPill({ tag }: TagPillProps) {
  return <span className="tag-pill">{tag}</span>;
}
