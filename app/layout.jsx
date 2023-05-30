import "@styles/globals.css";

export const metadata = {
  title: "Projecto Grabaciones CRP",
  description: "Un proyecto para descargar Grabaciones con filtros",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;