import PropTypes from 'prop-types';

function EditorJSRenderer({ content }) {
  if (!content) return null;

  // Parse the content structure - it can be in different formats
  const blocks = content?.[0]?.content?.blocks 
    || content?.[0]?.blocks 
    || (Array.isArray(content) && content[0]?.type ? content : []);

  const renderBlock = (block, index) => {
    const { type, data } = block;

    switch (type) {
      case 'header':
        const HeadingTag = `h${data.level}`;
        const headingSizes = {
          1: 'text-3xl md:text-4xl',
          2: 'text-2xl md:text-3xl',
          3: 'text-xl md:text-2xl',
          4: 'text-lg md:text-xl',
          5: 'text-base md:text-lg',
          6: 'text-sm md:text-base',
        };
        return (
          <HeadingTag
            key={index}
            className={`font-bold text-brand-primary mt-8 mb-4 ${headingSizes[data.level]}`}
            dangerouslySetInnerHTML={{ __html: data.text }}
          />
        );

      case 'paragraph':
        return (
          <p
            key={index}
            className="text-brand-primary leading-relaxed mb-4 text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: data.text }}
          />
        );

      case 'list':
        const ListTag = data.style === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag
            key={index}
            className={`mb-6 space-y-2 ${data.style === 'ordered' ? 'list-decimal' : 'list-disc'} list-inside text-brand-primary`}
          >
            {data.items.map((item, i) => (
              <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ListTag>
        );

      case 'image':
        return (
          <figure key={index} className="my-8">
            <img
              src={data.file?.url || data.url}
              alt={data.caption || ''}
              className="w-full rounded-xl shadow-lg"
            />
            {data.caption && (
              <figcaption className="text-center text-sm text-brand-muted mt-3 italic">
                {data.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'code':
        return (
          <pre key={index} className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto my-6">
            <code className="text-sm font-mono">{data.code}</code>
          </pre>
        );

      case 'quote':
        return (
          <blockquote
            key={index}
            className="border-l-4 border-brand-accent pl-6 py-2 my-6 italic text-brand-primary bg-slate-50 rounded-r-lg"
          >
            <p className="text-lg" dangerouslySetInnerHTML={{ __html: data.text }} />
            {data.caption && (
              <cite className="block mt-2 text-sm text-brand-muted not-italic">— {data.caption}</cite>
            )}
          </blockquote>
        );

      case 'delimiter':
        return (
          <div key={index} className="flex items-center justify-center my-8">
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
              <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
              <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
            </div>
          </div>
        );

      case 'table':
        return (
          <div key={index} className="overflow-x-auto my-6">
            <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
              <tbody>
                {data.content.map((row, rowIdx) => (
                  <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="border border-slate-200 px-4 py-2 text-brand-primary">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'embed':
        return (
          <div key={index} className="my-8">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
              <iframe
                src={data.embed}
                title="Embedded content"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
            {data.caption && (
              <p className="text-center text-sm text-brand-muted mt-3">{data.caption}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

EditorJSRenderer.propTypes = {
  content: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default EditorJSRenderer;
