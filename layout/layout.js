import Header from "../components/Header";
export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="obstacle_header"></div>
      <main className="Layout_main">{children}</main>
    </div>
  );
}
