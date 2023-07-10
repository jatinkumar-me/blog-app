import {
  ColorScheme,
  ColorSchemeProvider,
  Container,
  MantineProvider,
} from "@mantine/core";
import Navbar from "./components/Navbar";
import { Suspense, lazy, useState } from "react";
import BlogList from "./components/BlogList";
import { useSelector } from "react-redux";
import { selectToken } from "./features/authSlice";

const BlogForm = lazy(() => import('./components/BlogForm'));

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const token = useSelector(selectToken);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Navbar />
        <Container>
          {token && <Suspense fallback={<div>Loading...</div>}>
            <BlogForm />
          </Suspense> }
          <BlogList />
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
