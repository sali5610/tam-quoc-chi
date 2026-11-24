import quoteRecords from '../content/wiki/quotes.json';
import pilot from '../content/atlas/pilot.json';

export function CharacterQuotes({name}:{name:string}){
  const personId=pilot.people.find(person=>person.name===name)?.id;
  const quotes=quoteRecords.filter(quote=>quote.personId===personId);
  if(!quotes.length)return null;
  return <section className="character-quotes" aria-label="Lời lưu truyền">
    <h3>名言 · Lời lưu truyền</h3>
    {quotes.map(quote=><article className="character-quote" key={quote.id} data-quote-id={quote.id}>
      <span className="quote-layer">[{quote.layer}]</span>
      <blockquote><p>{quote.translation}</p></blockquote>
      <details><summary>Nguyên văn &amp; bối cảnh</summary>
        <p lang="zh-Hant" className="quote-original">{quote.original}</p>
        <p>{quote.context}</p><p className="quote-source"><a href={quote.sourceUrl} target="_blank" rel="noreferrer">{quote.source}</a></p>
      </details>
    </article>)}
  </section>;
}
