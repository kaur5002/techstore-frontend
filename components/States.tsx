import Link from "next/link";
export function ErrorState({ message = "We couldn't load the collection just now." }: { message?: string }) { return <section className="state-card"><span className="state-symbol">!</span><h2>Something went wrong</h2><p>{message}</p><Link className="button button-secondary" href="/">Try again</Link></section>; }
export function EmptyProducts() { return <section className="empty-state"><h2>The shelves are quiet</h2><p>There are no products to show right now. Please check back soon.</p></section>; }
