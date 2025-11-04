import "./SnippetTextAlignB.css"

export function SnippetTextAlignB() {
  return (
    <div className="snippet-text-align-b">
      <div className="wrapper">
        <article className="article article-1">
          <h3>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          </h3>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </p>
        </article>
        <article className="article article-2">
          <h3>At vero eos et accusamus et iusto odio</h3>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
        </article>
      </div>

      <div className="container-row">
        <label className="checkbox-container">
          <input type="checkbox" />
          <span className="text">Deactivate CSS text box</span>
        </label>
      </div>
    </div>
  )
}
