import Link from "next/link";
export default function NotFound() { return <main className="main-wrap"><section className="state-card"><span className="state-symbol">404</span><h1>We couldn’t find that piece</h1><p>It may have moved, or the link might be out of date.</p><Link className="button button-primary" href="/">Back to the collection</Link></section></main>; }
