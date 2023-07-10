import { Box, Button, Group } from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser, setBlogDraft } from "../features/authSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { modals } from "@mantine/modals";
import { Blog, setBlogs } from "../features/blogSlice";

export default function BlogForm() {
  const user = useSelector(selectUser);
  const blogDraft = user?.blogDraft;
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [changingFlag, setChangingFlag] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const debouncedValue = useDebounce<number>(changingFlag, 3000);

  useEffect(() => {
    const controller = new AbortController();
    autoSaveDraft(controller.signal);
    return () => controller.abort();
  }, [debouncedValue]);

  useEffect(() => {
    editor?.commands.setContent(blogDraft ?? "");
  }, [blogDraft]);

  async function autoSaveDraft(controller: AbortSignal) {
    try {
      if (changingFlag < 1) return;
      if (!token) {
        modals.openContextModal({
          modal: "authorization",
          title: "Authentication",
          innerProps: {},
        });
        return;
      }
      const currentContent = editor?.getHTML();
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/save-draft`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: currentContent }),
          signal: controller,
        }
      );
      const content = await response.json();
      dispatch(setBlogDraft(content.blogDraft));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function postBlog() {
    try {
      if (!token) {
        modals.openContextModal({
          modal: "authorization",
          title: "Authentication",
          innerProps: {},
        });
        return;
      }
      setIsPosting(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editor?.getHTML() }),
      });
      const blogs: Blog[] = await response.json();
      console.log(blogs);
      if (Array.isArray(blogs)) dispatch(setBlogs(blogs));
    } catch (err) {
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  }

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: blogDraft,
    onUpdate() {
      setChangingFlag((previousValue) => previousValue + 1);
    },
  });

  return (
    <Box mb={"md"}>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={0}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <Group position="right" spacing="xs" mt="sm">
        <Button
          loading={isLoading}
          onClick={() => autoSaveDraft(new AbortController().signal)}
        >
          {isLoading ? "Autosaving" : "Save as draft"}
        </Button>
        <Button
          onClick={() => postBlog()}
          loading={isPosting}
          disabled={(editor?.getText().length ?? 0) < 2}
        >
          Post
        </Button>
      </Group>
    </Box>
  );
}
