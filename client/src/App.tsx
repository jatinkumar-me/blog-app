import {
  ColorScheme,
  ColorSchemeProvider,
  Container,
  MantineProvider,
  Text,
} from "@mantine/core";
import BlogForm from "./components/BlogForm";
import Navbar from "./components/Navbar";
import { useState } from "react";
import BlogList from "./components/BlogList";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
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
          <BlogForm />
          <BlogList />
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
