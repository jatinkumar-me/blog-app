import { ContextModalProps } from "@mantine/modals";
import AuthForm from "./AuthForm";

const AuthModal = ({
  context,
  id,
}: ContextModalProps<{ modalBody: string }>) => (
  <>
      <AuthForm onClose={() => context.closeModal(id)}/>
  </>
);

export default AuthModal;
