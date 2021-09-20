import Link from "next/link";

export default function Header() {
  return (
    <div className="Header">
      <div className="Header__max">
        <Link href="/">
          <a className="Header__max_title">Pokedex App</a>
        </Link>
      </div>
    </div>
  );
}
