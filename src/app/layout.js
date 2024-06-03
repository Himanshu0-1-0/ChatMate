import "./globals.css"
import "bootstrap/dist/css/bootstrap.css";
import Bootstrapjs from "../InstallBSJS";

export const metadata = {
  title: "Not Decided Yet",
  description: "A chat app",
};

export default function RootLayout({ children }) {
  return (
    <>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='"true"' />
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />
    </head>
    <html lang="en">
    <Bootstrapjs/>
      <body>{children}
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
    </html>
    </>
  );
}
