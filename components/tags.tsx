import React from "react";

type Props = {
  tags: string[];
};

export default function Tags({ tags }: Props) {
  return (
    <div>
      <h3>Filed under:</h3>
      <div className="not-prose">
        <ul className="list-none p-0 flex overflow-x-auto gap-6">
          {tags.map((tag) => (
            <li key={tag} className="flex-shrink-0">
              <a
                href={"/tags/" + tag}
                className="block bg-black text-white px-3 py-1"
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
